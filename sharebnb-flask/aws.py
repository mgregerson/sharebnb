import logging
import boto3
from botocore.exceptions import ClientError
import os
import mimetypes


s3 = boto3.client(
  "s3",
  "us-east-1",
  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
)

bucket = os.getenv('BUCKET_NAME')




def upload_file(file_name,
                bucket=bucket,
                object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    mimetype, encoding = mimetypes.guess_type(file_name)
    print('MIMETYPES: ', mimetype)

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)
    # TODO: GET MIMETYPE of file_name to pass into ContentType in ExtraArgs below.
    # Upload the file
    s3_client = s3

    try:
        response = s3_client.upload_file(file_name, bucket, object_name, ExtraArgs={'ContentDisposition': 'inline',
                                                                                    'ContentType': mimetype})
        return response
    except ClientError as e:
        logging.error(e)
        return False

def download(file_name, bucket=bucket, object_name=None ):
    """"""

    if object_name is None:
        object_name = os.path.basename(file_name)

    s3_client = s3
    # output = s3.Bucket(bucket).download_file(file_name, file_name)
    output = s3_client.download_file(bucket, object_name, file_name)
    # s3.Bucket(BUCKET_NAME).download_file(KEY, 'my_local_image.jpg')
    print(output, 'the output')
    return output

def list_all_files(bucket):
    contents = []
    for item in s3.list_objects(Bucket=bucket)['Contents']:
        contents.append(item)
    return contents