export interface ITag {
    name: string;
    readonly color: string;
}

export class Tag implements ITag {
    name: string;
    readonly color: string;

    constructor(name: string = '', color: string = '') {
        this.name = name;
        this.color = color || this.generateRandomColor();
    }

    generateRandomColor(): string {
        const lowerLimit = 64;

        const r = Math.floor(Math.random() * (255 - lowerLimit) + lowerLimit);
        const g = Math.floor(Math.random() * (255 - lowerLimit) + lowerLimit);
        const b = Math.floor(Math.random() * (255 - lowerLimit) + lowerLimit);

        return `rgb(${r},${g},${b})`;
    }
}
