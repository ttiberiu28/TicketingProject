import { MyLocation } from "../../interfaces/MyLocation";
import { TicketType } from "../CartComp/TicketType";
import { MyKeyword } from "../../interfaces/MyKeyword";


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
    availableHours: string;
    availableDates: string;
    keywords: MyKeyword[];


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
        this.availableHours = data.availableHours;
        this.availableDates = data.availableDates;
        this.keywords = data.keywords;
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
            case TicketType.STUDENT_ONE_DAY_PASS:
                price = this.price - (0.05 * this.price) - 25;
                break;
            case TicketType.STUDENT_TWO_DAY_PASS:
                price = this.price * 2 - (0.05 * this.price * 2) - 75;
                break;
            case TicketType.STUDENT_THREE_DAY_PASS:
                price = this.price * 3 - (0.1 * this.price * 3) - 100;
                break;
            case TicketType.ZONE_A:
                price = this.price * 5;
                break;
            case TicketType.ZONE_B:
                price = this.price * 4;
                break;
            case TicketType.ZONE_C:
                price = this.price * 3;
                break;
            case TicketType.ZONE_A_STANDING:
                price = this.price * 3;
                break;
            case TicketType.ZONE_B_STANDING:
                price = this.price * 1.75;
                break;
            case TicketType.ZONE_C_STANDING:
                price = this.price * 1.25;
                break;

            default:
                price = this.price;

        }
        return Math.round(price);
    }

}