How to publish to server?

1. copy 
        dist 
        cert
        .env
        package.json
    file to server

2 open powershell as administrator

3 Install all npm node
    npm install

4 Install express js 
    npm install express 

Create a CA
    
1. Create public key
    openssl genrsa -des3 -out domain.key 2048

2. Creating a Certificate Signing Request
    openssl req -newkey rsa:2048 -keyout domain.key -out domain.csr

3. Creating a Self-Signed Certificate
    openssl x509 -signkey domain.key -in domain.csr -req -days 365 -out domain.crt

4. Creating a CA-Signed Certificate With Our Own CA
    openssl req -x509 -sha256 -days 1825 -newkey rsa:2048 -keyout rootCA.key -out rootCA.crt
    4.1 Sign Our CSR With Root CA
    First, we'll create a configuration text-file (domain.ext) with the following content:
        authorityKeyIdentifier=keyid,issuer
        basicConstraints=CA:FALSE
        subjectAltName = @alt_names
        [alt_names]
        DNS.1 = domain
    The “DNS.1” field should be the domain of our website.

5. Then we can sign our CSR (domain.csr) with the root CA certificate and its private key:
    openssl x509 -req -CA rootCA.crt -CAkey rootCA.key -in domain.csr -out domain.crt -days 365 -CAcreateserial -extfile domain.ext

6. View Certificates
    openssl x509 -text -noout -in domain.crt