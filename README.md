# Refresh CMS Scripts

#### This script pulls your application's CMS Codes into JSON objects so that they can be cached without needing browser-side caching. In our app, we run the refresh every time we pushing to master. Long term we intend to integrate this refresh script into our Jenkins job.
---
### Refresh CMS Codes for your app***
To run a refresh for your apps JSON code files use the command below. Default input file is at: resources/my_app_cms_codes. Default output path is: common/cms_codes:
```
  node src/trigger_refresh.js
```


---
### Obtaining all CMS codes for a given application group

This app will also pull an entire department's CMS codes. We found copying an entire app group's CMS codes helpful for exploratory research as the CMS website (http://adg/edm/codedecode/Manage/ManageCodes.aspx) has no search function currently. By copying all codes to your local machine, you enable local file search.

 There are two steps:


* ***Step 1:*** Generate a special input file by running this command. The output is placed at: resources/app_groups/[[system_ReleaseName_ApplicationGroup]].js:
```
node src/build_entire_app_group.js
```

* ***Step 2:*** Trigger a refresh using the above input file. An output folder must exist with the system name specified, example: common/[[system]]/, e.g. common/alliance/
```
node src/pull_entire_app_group.js
```
---

For comments, push requests, or helps with any of the above, please slack Elijah Itah or Scott Albers. Thanks to Niall O'Gorman and the entire billing explanation team for their help in preparing this.
Enjoy!

elijah says: http://edm/Edm/Mdv/Search/Search.aspx?SearchString=gender is for the dmain feature.

