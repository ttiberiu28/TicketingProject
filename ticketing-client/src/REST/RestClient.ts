import { Movie } from "../UI/MovieComp/Movie";
import { Cart } from "../interfaces/Cart";
import { Ticket } from "../interfaces/Ticket";
import { TicketDTO } from "../DTOs/TicketDTO";
import { Concert } from "../UI/ConcertComp/Concert";
import { Sport } from "../UI/SportComp/Sport";

export default class RestClient {
  // static baseUrl = "http://localhost:8080";
  static baseUrl = "http://192.168.1.95:8080";

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


  // // // 

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

  static async getConcerts(): Promise<Concert[]> {
    const url = `${RestClient.baseUrl}/api/concert/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get concerts");
    }

    const jsonData = await response.json();
    const concerts = jsonData.map((concertData: any) => new Concert(concertData));
    return concerts;
  }

  static async getSports(): Promise<Sport[]> {
    const url = `${RestClient.baseUrl}/api/sport/list`;
    const headers = new Headers();
    headers.set("Authorization", RestClient.token || "");

    const response = await fetch(url, { headers: headers });

    if (!response.ok) {
      throw new Error("Failed to get sports");
    }

    const jsonData = await response.json();
    const sports = jsonData.map((sportData: any) => new Sport(sportData));
    return sports;
  }

  // // // 




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

  // needs modification for every entity added to cart

  static async addTicketToCart(
    userId: number,
    movieId: number | null,
    concertId: number | null,
    sportId: number | null,
    ticketType: string,
    date: Date,
    selectedSeats: { row: number; seat: number }[],
    selectedTime: string
  ): Promise<Ticket> {
    const url = `${RestClient.baseUrl}/api/ticket/addToCart`;
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", RestClient.token || "");

    const body = JSON.stringify({
      userId,
      movieId,
      concertId,
      sportId,
      ticketType,
      localDate: date.toISOString(),
      seats: selectedSeats.map((seat) => ({ row: seat.row, seatNumber: seat.seat })),
      selectedTime,
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

  // needs modification for every entity added to cart
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
    cartResponse.tickets = cartResponse.tickets.map((ticketDTO: TicketDTO) => {
      const ticket: Ticket = {
        id: ticketDTO.id,
        date: new Date(ticketDTO.date),
        row: ticketDTO.row,
        seatNumber: ticketDTO.seatNumber,
        ticketType: ticketDTO.ticketType,
        ticketSeats: ticketDTO.ticketSeats,
        quantity: ticketDTO.quantity,
        selectedTime: ticketDTO.selectedTime,
        movieId: undefined,
        concertId: undefined,
        sportId: undefined,
      };

      if (ticketDTO.movie) {
        ticket.movieId = ticketDTO.movie.id;
        ticket.movie = ticketDTO.movie;
      }

      if (ticketDTO.concert) {
        ticket.concertId = ticketDTO.concert.id;
        ticket.concert = ticketDTO.concert;
      }

      if (ticketDTO.sport) {
        ticket.sportId = ticketDTO.sport.id;
        ticket.sport = ticketDTO.sport;
      }

      return ticket;
    });

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

  static async deleteTicketById(ticketId: number): Promise<void> {
    const url = `${RestClient.baseUrl}/api/ticket/deletion/${ticketId}`;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, { method: "DELETE", headers: headers });

    if (!response.ok) {
      throw new Error("Ticket deletion failed");
    }
  }

  static async deleteSeatById(seatId: number): Promise<void> {
    const url = `${RestClient.baseUrl}/api/ticketSeat/deletion/${seatId}`;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, { method: "DELETE", headers: headers });

    if (!response.ok) {
      throw new Error("Seat deletion failed");
    }
  }

  //user preferences functions below

  static async saveUserPreferences(userId: any, keywordIds: any) {
    const url = `${RestClient.baseUrl}/api/userPreference/new`;

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(keywordIds),
    };

    const response = await fetch(url + `?userId=${userId}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }


  static async deleteUserPreferences(userId: any) {
    const url = `${RestClient.baseUrl}/api/userPreference/deletion`;

    const requestOptions = {
      method: "DELETE",
    };

    const response = await fetch(url + `?userId=${userId}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

}

