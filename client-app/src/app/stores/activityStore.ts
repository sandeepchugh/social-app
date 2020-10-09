import { fstat } from 'fs';
import {action, observable} from 'mobx';
import { createContext } from 'react';
import { act } from 'react-dom/test-utils';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split(".")[0];
                this.activities.push(activity);
            });
            this.loadingInitial=false
        } catch (err) {
            console.log(err);
            this.loadingInitial=false
        }
    };

    @action selectActivity = (id:string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());