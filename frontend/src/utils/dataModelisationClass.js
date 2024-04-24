


export default class UserModelisedData{
    constructor(data) {
        this.id = data.id || data.userId;
        this.firstName = data.userInfos.firstName;
        this.lastName = data.userInfos.lastName;
        this.age = data.userInfos.age;
        this.todayScore = data.todayScore || data.score;
        this.keyData = data.keyData;
        this.sessions = data.sessions;
        this.sessions = data.sessions;
        this.kind = data.kind;
        this.data = data.data;

    }
}
