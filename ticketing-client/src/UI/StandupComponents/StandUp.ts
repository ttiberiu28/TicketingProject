import { MyLocation } from "../../interfaces/MyLocation";

export class StandUp {

    id: number;
    price: number;
    name: string;
    lengthMinutes: number;
    imageUrl: string;
    description: string;
    eventOrganizer: string;
    tickets: string[];
    locations: MyLocation[];


    constructor(data: any) {
        this.id = data.id;
        this.price = data.price;
        this.name = data.name;
        this.lengthMinutes = data.lengthMinutes;
        this.imageUrl = data.imageUrl;
        this.description = data.description;
        this.eventOrganizer = data.eventOrganizer;
        this.tickets = data.tickets;
        this.locations = data.locations;
    }

}