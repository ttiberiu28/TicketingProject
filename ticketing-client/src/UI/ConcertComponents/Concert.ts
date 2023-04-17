import { MyLocation } from "../../interfaces/MyLocation";
import { TicketType } from "../TicketType";


export class Concert {

    id: number;
    price: number;
    name: string;
    lengthMinutes: number;
    tickets: string[];
    concertDescription: string;
    imageUrl: string;
    trailerUrl: string;
    locations: MyLocation[];
    artistName: string;

    constructor(data: any) {
        this.id = data.id;
        this.price = data.price;
        this.name = data.name;
        this.lengthMinutes = data.lengthMinutes;
        this.tickets = data.tickets;
        this.concertDescription = data.concertDescription;
        this.imageUrl = data.imageUrl;
        this.trailerUrl = data.trailerUrl;
        this.locations = data.locations;
        this.artistName = data.artistName;
    }

    getPrice(ticketType: TicketType): number {
        let price;

        switch (ticketType) {
            case TicketType.TWO_DAY_PASS:
                price = this.price * 2 - (0.05 * this.price * 2);
                break;
            case TicketType.THREE_DAY_PASS:
                price = this.price * 3 - (0.1 * this.price * 3);
                break;
            default:
                price = this.price;

        }
        return Math.round(price);
    }

}