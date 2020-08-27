class UserInfo {
    constructor(nameInfo, jobInfo) {
        this.nameInfo = nameInfo;
        this.jobInfo = jobInfo;
    }

    setUserInfo(name, job) {
        this.name = name;
        this.job = job;
    }

    updateUserInfo() {
        this.nameInfo.textContent = this.name;
        this.jobInfo.textContent = this.job;
    }
}