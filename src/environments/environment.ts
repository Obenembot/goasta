// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const BASE_URL = 'https://dev.mosontech.co.za/feestracker-service'
export const environment = {
    production: false,
    COURSE_URL: `${BASE_URL}/api/courses`,
    STUDENT_URL: `${BASE_URL}/api/students`,
    USER_URL: `${BASE_URL}/api/users`,
    PAYMENT_URL: `${BASE_URL}/api/payments`,
    REPORT_URL: `${BASE_URL}/api/reports`,
    INSTITUTIONS_URL: `${BASE_URL}/api/institutions`,
    LOGIN_URL: `${BASE_URL}/api/authenticate`,
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
