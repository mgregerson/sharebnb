import logging
import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv
from flask import Flask

s3 = boto3.client(
  "s3",
  "us-east-1",
  aws_access_key_id="AKIA33S3JNQM47NNYTZH",
  aws_secret_access_key="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",
)

bucket_name = 'sharebnb-mg-bj'

load_dotenv()

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = s3
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
        return response
    except ClientError as e:
        logging.error(e)
        return False
    
def download(bucket, file_name, object_name=None ):
    # output = f"download_files/{file_name}"
    # s3.Bucket(bucket).download_file(file_name, output)
    if object_name is None:
        object_name = os.path.basename(file_name)

    output = s3.download_file(bucket, object_name, file_name)
    return output

def list_all_files(bucket):
    contents = []
    for item in s3.list_objects(Bucket=bucket)['Contents']:
        contents.append(item)
    return contents