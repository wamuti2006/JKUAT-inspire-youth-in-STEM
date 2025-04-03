import hashlib
import os
#passwordstorage
FILENAME='password.txt'

#function to hash the password
def hash_password(password):
    """hash a password for storing"""
    return(hashlib.sha256(password.encode()).hexdigest())

#function save the password
def save_password(site'password):
    hashed_passsword=hash_password(password)              
    with open(FILENAME,'a') as file:
    file.write(f"{site} {hashhed_password}/n")
print(f"password for {site} saved successfully")

#function to get the password
def get_password(site)
    if not os.path.exists(FILENAME):
    print("No password saved yet")
    return
    with open(FILENAME,"r")as f:
        for line in f:
            stored_site, stored_password = line.strip().split("")
            if stored_site==site:
                return stored_password
    print(f"no password saved for{site}")
    return None

def main():
    if not os.path.exists(FILENAME):
        with open(FILENAME,'w')as file:
            pass#create the file if it does not exist
      



if action=='save':
    site = input("Enter the site:")
    import string
    import random
#