1. Clone repo: git clone https://github.com/emilystewart26/food-app-backend.git

2. Initialise npm: npm init -y

3. Install dependencies: npm i nodemon express mongoose dotenv cors bcrypt jsonwebtoken axios  @clerk/express   

4. Create .env file locally & add MongoDB connection string +  Clerk keys (2x) + valid email address for Nominatim API requests  (for more info see: .env.example) 


5. Nominatim Usage Policy (aka Geocoding Policy)
Requirements
*No heavy uses (an absolute maximum of 1 request per second).
*Provide a valid HTTP Referer or User-Agent identifying the application (stock User-Agents as set by http libraries will not do).
*Clearly display attribution as suitable for your medium.
*Data is provided under the ODbL license which requires to share alike (although small extractions are likely to be covered by fair usage / fair dealing).
Full info: https://operations.osmfoundation.org/policies/nominatim/
 