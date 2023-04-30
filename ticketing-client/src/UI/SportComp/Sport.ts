import { MyLocation } from "../../interfaces/MyLocation";
import { TicketType } from "../CartComp/TicketType";
import { MyKeyword } from "../../interfaces/MyKeyword";


export class Sport {

    id: number;
    price: number;
    name: string;
    lengthMinutes: number;
    tickets: string[];
    sportDescription: string;
    imageUrl: string;
    bannerUrl: string;
    locations: MyLocation[];
    availableHours: string;
    availableDates: string;
    keywords: MyKeyword[];


    constructor(data: any) {
        this.id = data.id;
        this.price = data.price;
        this.name = data.name;
        this.lengthMinutes = data.lengthMinutes;
        this.tickets = data.tickets;
        this.sportDescription = data.sportDescription;
        this.imageUrl = data.imageUrl;
        this.bannerUrl = data.bannerUrl;
        this.locations = data.locations;
        this.availableHours = data.availableHours;
        this.availableDates = data.availableDates;
        this.keywords = data.keywords;
    }

    getPrice(ticketType: TicketType): number {
        let price;

        switch (ticketType) {
            case TicketType.PELUZA_NORD:
                price = this.price;
                break;
            case TicketType.PELUZA_SUD:
                price = this.price + 5;
                break;
            case TicketType.TRIBUNA_EST_ZONE_1:
                price = this.price + 10;
                break;
            case TicketType.TRIBUNA_EST_ZONE_2:
                price = this.price + 15;
                break;
            case TicketType.TRIBUNA_VEST_ZONE_1:
                price = this.price + 12;
                break;
            case TicketType.TRIBUNA_VEST_ZONE_2:
                price = this.price + 17;
                break;
            default:
                price = this.price;

        }
        return Math.round(price);
    }

}