export class Launch {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly date_utc: Date,
        public readonly rocketId: string,
        public readonly success: boolean,
        public readonly details: string,
        public readonly flight_number: string[]
    ) { }
}