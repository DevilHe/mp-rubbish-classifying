'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const word_res = await uniCloud.httpclient.request(
		'https://api.tianapi.com/txapi/everyday/index?key=06dfcc6ff124e5cf7c3a9408b8c5afa0',
		{
			method: 'GET',
			dataType: 'json'
		}
	)
	
	//返回数据给客户端
	return word_res
};
