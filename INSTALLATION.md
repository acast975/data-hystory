##Overview

To start this application you need to install:
* Node.js
* node-oracledb which requires:
  * Visual Studio
  * Python
  * Oracle Instant Client
* data-history application

Before you begin the installation, you need to know the bitness of your Windows Operating System. Is it 32-bit or 64-bit? If 32-bit, you must use 32-bit software throughout the rest of the process. What’s important is that you remain consistent with the same bitness for **all the software** that is required. For example, if you use 64-bit Node.js and 32-bit Oracle Instant client it won't work.

## Installation on Windows
### Node.js

Donwload [Node.js](https://nodejs.org/en/). In this project I have been using 4.3.0 version, you can check [node-oracle’s README.md](https://github.com/oracle/node-oracledb) to find a version that you can use with oracle-db add-on. 

Run installation and at the *Custom Setup* page, be sure that *Add to Path* is selected. If you omited this step, you can manually edit the system variable *Path* and add nodejs installation folder (e.g. D:\Program Files\nodejs\). 

### Visual Studio

Install Visual Studion 2013 with Update 5 or Visual Studio 2015, you can use community edition. It also should work with Visual Studio 2012.

### Python 2.7 

Donwload [Python]( https://www.python.org/downloads/release/python-2710/) **version 2.7**. Once at the page, you will want to either download the file named *Windows x86-64 MSI installer* or *Windows x86 MSI installer* depending on whether you are doing a 32-bit or 64-bit installation. The file marked x86-64 is for 64-bit installations. 

Start installation and on the third screen of the installation you will be asked to customize the installation. At this screen it’s important that you scroll down to where it says *Add python.exe to Path* and select to include it with the installation.

### Oracle Instant Client

Donwload [Oracle Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html), for 64-bit installations click *Instant Client for Microsoft Windows (x64)* or for 32-bit choose *Instant Client for Microsoft Windows (32-bit)*. There are two files to download: 
  1. Instant Client Package – Basic
  2. Instant Client Package – SDK

Extract all files from this two zip archives into empty folder (e.g. D:\instantclient_12_1). Your folder should look somethig like this:

![Alt text](/assets/readme/instant_client_folder_structure.png?raw=true "Instant Client Folder Content Example")

####Set Oracle Instant Client *Path* variable
1. Using your mouse, click on the *Start Menu* then right click *Computer* and choose *Properties*. 
2. Click on *Advanced system settings* which is located on the left side of the window. This will bring up the System Properties dialog box.
3. Click on the Environment Variables button.
4. Once at the Environment Variables window, you will want to search the System Variables list (located on the bottom half of the window) for Path. Once found click on it and then click “Edit”.
5. Add folder location where you installed Oracle Instant Client, here it's  *D:\instantclient_12_1*. ![Adding Instant Client to Path](/assets/readme/instant_client_path.png?raw=true "Adding Instant Client to Path")

####Add *OCI_LIB_DIR* system variable
1. Under the System variable sections, click *New*.
2. Add *OCI_LIB_DIR* as the variable name.
3. Add *D:\instantclient_12_1\sdk\lib\msvc* as the variable value. 
![Adding OCI_LIB_DIR system variable](/assets/readme/oci_lib_dir_variable.png?raw=true "Adding OCI_LIB_DIR system variable")
4. Click *OK* to save.

####Add *OCI_INC_DIR* system variable
1. Under the System variable sections, click *New*
2. Add *OCI_INC_DIR* as the variable name.
3. Add *D:\instantclient_12_1\sdk\include* as the variable value.
![Adding OCI_LIB_DIR system variable](/assets/readme/oci_inc_dir_variable.png?raw=true "Adding OCI_INC_DIR system variable")
4. Click *OK* to save.

Click *OK* on the following two windows to finish saving and closing the dialog boxes.


## Installing data-history application
  1. download project or clone it with git
  2. open command line and navigate to the *data-history/src* folder
  3. finally, run the command:
```
npm install
```

If successful, your results should look similar to the below:

![Installation console output](/assets/readme/installation_console_output.png?raw=true "Installation console output")

This will install application dependencies including *oracledb*. When installation is finished you can start applicatoin.
