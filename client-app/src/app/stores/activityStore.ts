import {action, observable, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

configure({enforceActions: 'always'});

export class ActivityStore {
    @observable activityRegistry = new Map();

    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(
            Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a,b) => Date.parse(a.date) - Date.parse(b.date)
        );

        
        return Object.entries(sortedActivities.reduce((activities,activity)=> {
            const date = activity.date.split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key:string]:IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities',() => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split(".")[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial=false
            });
            console.log(this.groupActivitiesByDate(activities));
        } catch (err) {
            console.log(err);
            runInAction('load activities error',() => {
                this.loadingInitial=false
            });
        }
    };

    @action loadActivity = async (id:string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                const activity = await agent.Activities.details(id);
                runInAction('getting activity',() => {
                    this.activity = activity;
                    this.loadingInitial = false;
                    });
            } catch (err) {
                console.log(err);
                runInAction('get activity error',() => {
                    this.loadingInitial=false
                });
            }
        }
    };

    getActivity = (id:string) => {
        return this.activityRegistry.get(id);
    }

    @action clearActivity = () => {
        this.activity = null;
    }
    
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await agent.Activities.create(activity);
            runInAction('creating activity',() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
                this.editMode=false;
            });
        } catch (err) {
            console.log(err);
            runInAction('create activity error',() => {
                this.submitting = false;
                this.editMode=false;
            });
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;

        try {
            await agent.Activities.update(activity);
            runInAction('editing activity',() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
                this.editMode=false;
            });
        } catch (err) {
            console.log(err);
            runInAction('edit activity error',() => {
                this.submitting = false;
                this.editMode=false;
            });
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement> , id:string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity',() => {
                this.activityRegistry.delete(id);
                this.activity = null;
                this.submitting = false;
                this.target = '';
            });
        } catch (err) {
            console.log(err);
            runInAction('delete activity error',() => {
                this.submitting = false;
                this.target = '';
            });
        }
    }

    @action selectActivity = (id:string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    }

    @action openEditForm = (id:string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = null;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }


}

export default createContext(new ActivityStore());