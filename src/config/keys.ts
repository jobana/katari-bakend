export const jwtSecret = process.env.SECRET_JWT_KATARI;
export const accessKeyId =  process.env.ACCESSKEYID;
export const secretAccessKey = process.env.SECRETACCESSKEY;
export const bucketName = process.env.BUCKETNAME;
export const regionAws = process.env.REGIONAWS;

if (!jwtSecret) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}else if(!secretAccessKey){
    console.log("No secretAccessKey aws string. Set SECRETACCESSKEY environment variable.");
    process.exit(1);
}