export default class RestClient {
  static baseUrl = "http://localhost:8080";
  static token?: string;

  static async login(username: string, password: string) : Promise<any> {

    const url = `${RestClient.baseUrl}/api/user/login`;
  
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
  
    const body = JSON.stringify({username: username, password: password});
  
    const response = await fetch(url, {method: "POST", headers: headers, body: body});
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    const token = response.headers.get("Authorization");
    if (token) {
      localStorage.setItem("token", token);
    }
  
    return response.json();
  }
  

  static async getLocations(): Promise<any> {
    const url = `${RestClient.baseUrl}/api/location/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get locations");
    }

    return response.json();
  }

  static async getOneLocation(id: number): Promise<any> {
    const url = `${RestClient.baseUrl}/api/location/${id}`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error(`Failed to get location with id ${id}`);
    }

    return response.json();
  }

  static async getMovies(): Promise<any> {
    const url = `${RestClient.baseUrl}/api/movie/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get movies");
    }

    return response.json();
  }

  static async getStandUpEvents(): Promise<any> {
    const url = `${RestClient.baseUrl}/api/standup/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get stand-up events");
    }

    return response.json();
  }
}

