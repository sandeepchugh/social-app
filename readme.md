


## Development Environment

### Setup

#### Install Dotnet core SDK
https://dotnet.microsoft.com/download/dotnet-core/3.1

#### New Project Setup
Create solution file
```shell script
dotnet new sln
```

Class Library 
```shell script
dotnet new classlib -n Domain
dotnet new classlib -n Application
dotnet new classlib -n Persistence
```

Web Api
```shell script
dotnet new webapi -n Api
```

Add projects to solution
```shell script
dotnet sln add Domain/Domain.csproj
dotnet sln add Application/Application.csproj
dotnet sln add Persistence/Persistence.csproj
dotnet sln add Api/Api.csproj
```

Add project dependencies

Application
```shell script
cd Application
dotnet add reference ../Domain/Domain.csproj 
dotnet add reference ../Persistence/Persistence.csproj 
```

Persistence
```shell script
cd Persistence
dotnet add reference ../Domain/Domain.csproj 
```

Api
```shell script
cd Api
dotnet add reference ../Application/Application.csproj 
```

#### Tool dependencies

```shell script
dotnet tool install --global dotnet-ef
```

#### Database Setup

```shell script
dotnet ef migrations add InitialCreate -p Persistence/ -s Api/
```

#### Adding Seed Data

```shell script
dotnet ef migrations add SeedValues -p Persistence/ -s Api/
```

#### React App Setup
```shell script
npx create-react-app client-app --use-npm --typescript
```
Readme -> /client-app/README.md