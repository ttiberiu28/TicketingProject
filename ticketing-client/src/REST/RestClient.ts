import { Cart } from "../interfaces/Cart";

export default class RestClient {
  static baseUrl = "http://localhost:8080";
  static token?: string;

  static async signUp(username: string, password: string, confirmPassword: string, email: string, firstName: string, lastName: string): Promise<any> {
    const url = `${RestClient.baseUrl}/api/user/new`;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const body = JSON.stringify({
      username,
      password,
      confirmPassword,
      email,
      firstName,
      lastName,
    });

    const response = await fetch(url, { method: "POST", headers: headers, body: body });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response.json();
  }


  static async login(username: string, password: string): Promise<any> {
    const url = `${RestClient.baseUrl}/api/user/login`;
  
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
  
    const body = JSON.stringify({ username: username, password: password });
  
    const response = await fetch(url, { method: "POST", headers: headers, body: body });
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    const token = response.headers.get("Authorization");
    if (token) {
      localStorage.setItem("token", token);
    }
  
    const responseData = await response.json(); // Get the JSON response data
    localStorage.setItem("userId", responseData.id.toString()); // Store the user ID in local storage
    localStorage.setItem("username", responseData.username);
    return responseData;
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

  static async addTicketToCart(userId: number, movieId: number, ticketType: string, date: Date, row: number, seatNumber: number): Promise<any> {
    const url = `${RestClient.baseUrl}/api/ticket/addToCart`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", RestClient.token || "");
  
    const body = JSON.stringify({
      userId,
      movieId,
      ticketType,
      localDate: date.toISOString(),
      row: row,
      seatNumber: seatNumber
    });
  
    const response = await fetch(url, { method: "POST", headers: headers, body: body });
  
    if (!response.ok) {
      const responseText = await response.text();
      console.error("Raw error response:", responseText);
      console.error("Error response:", JSON.parse(responseText));
      throw new Error("Failed to add ticket to cart");
    }
  
    return response.json();
}

static async getCart(userId: number): Promise<Cart> {
  const url = `${RestClient.baseUrl}/api/cart/getCart?userId=${userId}`;
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", RestClient.token || "");

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}


  
}

