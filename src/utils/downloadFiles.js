/**
 * 下载管理器
 * Created by 万成 on 2018/8/31.
 */

 /**
 * 下载保存一个文件
 */
	function downloadSaveFile(obj) {
	 	let self = this,
	 			success = obj.success,
	 			fail = obj.fail,
	 			urls = obj.urls;
	 	wx.downloadFile({
	 		url: urls,
	 		success: function(res) {
	 			console.log(res)
	 			wx.saveFile({
		      tempFilePath: res.tempFilePath,
		      success: function(res) {
		      	console.log(res)
		      	console.log('保存一个文件成功')
		        if (success) {
		        	success(res)
		        }
		      },
		      fail: function(e) {
		      	console.log('保存一个文件失败')
		      	if (fail) {
	              fail(e);
	          }
		      }
		    })
	 		}
	 	})
	}

 /**
 * 下载保存多个个文件，要求全部下载成功才返回成功
 */
	function downloadSaveFiles (obj) {
	 	let self = this,
	 			success = obj.success,
	 			fail = obj.fail,
	 			urls  = obj.urls,
	 			savedFilePaths = [],
	 			urlsLength = urls.length;  // 有几个url需要下载
	 	if (urls.length == 1) {
	 		obj.urls = urls[0];
	 		downloadSaveFile(obj);
	 		return
	 	}
	 	else{
		 	for (var i = 0; i < urlsLength; i++) {
		 		downloadSaveFile({
		 			urls: urls[i],
		 			success: function(res) {
		 				//一个文件下载保存成功
	          let savedFilePath = res.savedFilePath;
	          savedFilePaths.push(savedFilePath);
	          if (savedFilePaths.length == urlsLength) { //如果所有的url 才算成功
	            if (success){
	              success(savedFilePaths)
	            }
	          }
		 			},
		 			fail:function(e) {
		 				console.info("下载失败");
	          if (fail) {
	            fail(e);
	          }
		 			}
		 		})
		 	}
	 	}
	}


	export default {
		downloadSaveFiles, downloadSaveFile
	}