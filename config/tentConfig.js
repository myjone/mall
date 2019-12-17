const  STS = require('qcloud-cos-sts'); 

let policy = function (LongBucketName, Region) {
    let ShortBucketName = LongBucketName.substr(0, LongBucketName.indexOf('-'));
    let AppId = LongBucketName.substr(LongBucketName.indexOf('-') + 1);
    return {
        version: '2.0' /* 策略语法版本，默认为2.0 */,
        statement: [
            {
                action: [
                    // '*'
                    // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
                    // 简单上传
                    'name/cos:PutObject',
                    'name/cos:PostObject',
                    // 分片上传
                    'name/cos:InitiateMultipartUpload',
                    'name/cos:ListMultipartUploads',
                    'name/cos:ListParts',
                    'name/cos:UploadPart',
                    'name/cos:CompleteMultipartUpload',
                    'name/cos:uploadFiles'
                ] /* 此处是指 COS API，根据需求指定一个或者一序列操作的组合或所有操作(*) */,
                effect: 'allow' /* 有 allow （允许）和 deny （显式拒绝）两种情况 */,
                principal: { qcs: ['*'] } /* 委托人 授权子账户权限 */,
                resource: ['qcs::cos:' + Region + ':uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/*'] /* 授权操作的具体数据，可以是任意资源、指定路径前缀的资源、指定绝对路径的资源或它们的组合 */
            }
        ]
    };
};


let getOssKey = () => {
    return new Promise(async (resolve, reject) => {
        try {
            STS.getCredential(
                {
                    secretId: 'AKIDviF5oIJWHmDQSHd1VrOhjzPqAKK8tLYa',
                    secretKey: '1pY2GEX8S3QWOzLQGrIVSlqjVBdxAG9q',
                    policy: policy('aixiang-1258912726', 'ap-shanghai'),
                    durationSeconds: 7200
                },
                async (err, credential) => {
                    console.log(err || credential) // 这里拿到错误或者临时签名信息。
                    /*  R.send()为封装的统一返回方法，请自行删减。 */
                    return resolve(( err || credential));
                }
            );
        } catch (error) {
            //   console.log('getOssKey:', error);
            return resolve(error);
        }
    });
};


module.exports = {
    getOssKey
}
