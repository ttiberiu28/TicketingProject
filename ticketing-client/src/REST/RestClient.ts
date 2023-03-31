export default class RestClient {

    static baseUrl = "http://localhost:8080"; 
    static username = "Tibi";
    static password = "12345";
    
    // return type is the generic: Promise<any> 
    static getLocations() : Promise<any> {
        
        const url = `${RestClient.baseUrl}/api/location/list`;

        const headers = new Headers();
        headers.set("Authorization", "Basic " + btoa(RestClient.username + ":" + RestClient.password));

        return fetch(url, {headers: headers}).then(response => response.json());
    }

    static async getOneLocation(id: number) : Promise<any>{
        const url = `${RestClient.baseUrl}/api/location/${id}`;

        const headers = new Headers();
        headers.set("Authorization", "Basic " + btoa(RestClient.username + ":" + RestClient.password));

        return (await fetch(url, {headers: headers})).json()
    }
    
}
