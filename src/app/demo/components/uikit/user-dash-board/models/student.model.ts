import {Course} from "./course.model";

export class Student {
    constructor(public id?: number,
                public firstName?: string,
                public lastName?: string,
                public createdBy?: string,
                public email?: string,
                public createdDate?: string,
                public lastModifiedBy?: string,
                public lastModifiedDate?: string,
                public courses?: Course[],) {
    }
}
