// import RNFS from "react-native-fs";
import {Components} from "./../StackComponent";
const RNFS = Components.react_native_fs;
import {Tools} from "./Tools";

/**
 * 文件目录系统操作，
 * 如：可复制文件目录到指定目录，读取文件目下所有文件及文件目录，可删除文件和文件目录
 * **/
export  class FileDirMgr{

    /**
     * 复制目录到指定目录
     * @param sourceDir string,//源目录
     * @param destDir string,//目标目录
     * return Promise;
     Promise resolve(results)回传数据
     results = [
     {
         ctime: date,     // The creation date of the file (iOS only)
         mtime: date,     // The last modified date of the file
         name: string,     // The name of the item
         path: string,     // The absolute path to the item
         size: string,     // Size in bytes
         isFile: () => boolean,        // Is the file just a file?
         isDirectory: () => boolean  // Is the file a directory?
     }
     .
     .
     .
     ];
     * **/
    static copyDir(sourceDir,destDir){
        return new Promise(resolve => {

            if(this.verfyComponent()){
                console.info("sourceDir",sourceDir);
                console.info("destDir",destDir);
                this.readDir(sourceDir)
                    .then(results=>{


                        /*for(let i = 0;i < results.length;i++){
                            results[i].sourcePath = results[i].path;
                        }*/
                        results.forEach((v,i,a)=>{
                            v.sourcePath = v.path;
                            v.destPath = v.path.replace(sourceDir,destDir);
                        });

                        console.info("readDir",results);

                        this.copyFiles(results).then((results)=>resolve(results));

                    });
            }
        });
    }

    /**
     * 读取目录下的所有文件
     * @param path string,//文件夹路径
     * return Promise;返回所有文件的路径
     Promise resolve(results)回传数据
     results = [
     {
         ctime: date,     // The creation date of the file (iOS only)
         mtime: date,     // The last modified date of the file
         name: string,     // The name of the item
         path: string,     // The absolute path to the item
         size: string,     // Size in bytes
         isFile: () => boolean,        // Is the file just a file?
         isDirectory: () => boolean  // Is the file a directory?
     }
     .
     .
     .
     ];
     * **/
    static readDir(path){

        return new Promise(resolve => {
            if(this.verfyComponent()){
                this.readDirFile(path,resolve);
            }
        });
    }

    /**
     * 删除目录或文件
     * @param path string;//文件或文件夹目录
     * return Promise;
     resolve(path);
     * **/
    static deleteDirOrFile (path) {
        return new Promise((resolve) => {
            if(this.verfyComponent()){
                RNFS.unlink(path).then(() => {
                    console.info('FILE DELETED success',"success");
                    resolve(path);
                }).catch((err) => {
                    console.info('FILE DELETED err',err);
                    resolve(path);
                });
            }
        });
    }

    /**
     * -------------------------------------------------------------------------------------------------------------------------------------------------
     * **/

    /**
     * 读取目录下的所有文件
     * @param path string,//文件夹路径
     * @param resolve func,//回调函数
     * @param files array,//resolve中返回的数据
     * @param dirs array,//未读取的目录
     files = [
     {
         ctime: date,     // The creation date of the file (iOS only)
         mtime: date,     // The last modified date of the file
         name: string,     // The name of the item
         path: string,     // The absolute path to the item
         size: string,     // Size in bytes
         isFile: () => boolean,        // Is the file just a file?
         isDirectory: () => boolean  // Is the file a directory?
     }
     .
     .
     .
     ];
     dirs = [
     {
         ctime: date,     // The creation date of the file (iOS only)
         mtime: date,     // The last modified date of the file
         name: string,     // The name of the item
         path: string,     // The absolute path to the item
         size: string,     // Size in bytes
         isFile: () => boolean,        // Is the file just a file?
         isDirectory: () => boolean  // Is the file a directory?
     }
     .
     .
     .
     ];
     * **/
    static readDirFile(path,resolve,files=[],dirs=[]){
        RNFS.readDir(path)
            .then(results=>{
                // console.info("results",results);

                for(let i = 0; i < results.length; i++){
                    let item = results[i];
                    if(item.isDirectory()){
                        dirs.push(item);
                    }
                    else
                    {
                        files.push(item);
                    }
                }

                if(dirs.length > 0){
                    let item = dirs.pop();
                    this.readDirFile(item.path,resolve,files,dirs);
                }
                else
                {
                    console.info("files",files);
                    resolve&&resolve(files);
                }

            });


    }

    /**
     * 复制多个文件，文件存在则，重载
     * @param fileList array,//源文件路径
     * fileList = [
       {
          sourcePath:"",//string 源文件路径
          destPath:"",//string 目标文件路径
       }
       .
       .
       .
     ];
     * return Promise;
      resolve(fileList);
     * **/
    static copyFiles(fileList=[]){
        return new Promise((resolve, reject) => {
            this.copyFileList(fileList,resolve);
        });
    }

    /**
     * 复制多个文件，文件存在则，重载
     * @param fileList json,//源文件路径
     * @param resolve func,//复制完成的回调函数
     * @param index int,//复制文件的数组下标
     * fileList = [{
          sourcePath:"",//string 源文件路径
          destPath:"",//string 目标文件路径
       }...];
     resolve(fileList);
     * **/
    static copyFileList(fileList=[],resolve,index=0){
        if(index < fileList.length){
            this.copyFile(fileList[index].sourcePath,fileList[index].destPath)
                .then(()=>{
                    this.copyFileList(fileList,resolve,++index);
                })
                .catch(()=>{
                    this.copyFileList(fileList,resolve,++index);
                });
        }
        else
        {
            resolve&&resolve(fileList);
        }
    }

    /**
     * 复制文件，文件存在则，重载
     * @param sourcePath, string,//源文件路径
     * @param destPath, string,//目标文件路径
     * return Promise;
     resolve(destPath,sourcePath)
     * **/
    static copyFile(sourcePath,destPath){
        return new Promise((resolve, reject) => {
            let dir = destPath.substring(0,destPath.lastIndexOf('/'));

            this.deleteDirOrFile(destPath)
                .then(()=>{
                    RNFS.mkdir(dir)
                        .then(()=>{
                            RNFS.copyFile(sourcePath,destPath)
                                .then(()=>resolve(destPath,sourcePath))
                                .catch(()=>reject());
                        });
                });
        });
    }

    static verfyComponent(){
        let b = true;
        if(!RNFS.DocumentDirectoryPath){
            console.info("请安装文件操作组件","react-native-fs");
            Tools.toast("请安装组件 react-native-fs");
            b = false;
        }

        return b;
    }
}