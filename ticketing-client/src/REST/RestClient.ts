import { Movie } from "../UI/MovieComponents/Movie";
import { Cart } from "../interfaces/Cart";
import { Ticket } from "../interfaces/Ticket";
import { TicketDTO } from "../interfaces/TicketDTO";

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

  // get events

  static async getMovies(): Promise<Movie[]> {
    const url = `${RestClient.baseUrl}/api/movie/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get movies");
    }

    const jsonData = await response.json();
    const movies = jsonData.map((movieData: any) => new Movie(movieData));
    return movies;
  }

  static async getConcerts(): Promise<any> {
    const url = `${RestClient.baseUrl}/api/concert/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get concerts");
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

  //finish get events

  static async addTicketToCart(userId: number, movieId: number, ticketType: string, date: Date, row: number, seatNumber: number): Promise<Ticket> {
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

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error("Failed to add ticket to cart");
    }

    const data = await response.json();

    return data as Ticket;
  }

  static async getCart(userId: number): Promise<Cart> {
    const url = `${RestClient.baseUrl}/api/user/getCart?userId=${userId}`;
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

    const cartResponse = await response.json();


    // Map the tickets array to convert date strings to Date objects and TicketDTOs to Tickets
    cartResponse.tickets = cartResponse.tickets.map((ticketDTO: TicketDTO) => ({
      id: ticketDTO.id,
      movieId: ticketDTO.movie.id,
      movie: ticketDTO.movie,
      date: new Date(ticketDTO.date),
      row: ticketDTO.row,
      seatNumber: ticketDTO.seatNumber,
      ticketType: ticketDTO.ticketType,
      quantity: ticketDTO.quantity,

    }));

    return cartResponse;
  }

  static async incrementTicketQuantity(ticketId: number): Promise<Ticket> {
    const url = `${RestClient.baseUrl}/api/ticket/increment/${ticketId}`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to increment ticket quantity");
    }

    const data = await response.json();
    return data as Ticket;
  }

  static async decrementTicketQuantity(ticketId: number): Promise<Ticket> {
    const url = `${RestClient.baseUrl}/api/ticket/decrement/${ticketId}`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to decrement ticket quantity");
    }

    const data = await response.json();
    return data as Ticket;
  }




}

