import { HttpLink } from 'apollo-boost';
const httpLink = new HttpLink({ uri: process.env.REACT_APP_SERVER_URL });

export default httpLink;
