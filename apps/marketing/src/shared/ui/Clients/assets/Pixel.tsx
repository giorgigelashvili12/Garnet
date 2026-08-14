export type Pixel = {
    x: number;
    y: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    speed: number;
    size: number;
    sizeStep: number;
    minSize: number;
    maxSizeInt: number;
    maxSize: number;
    delay: number;
    counter: number;
    counterStep: number;
    isIdle: boolean;
    isReverse: boolean;
    isShimmer: boolean;
    draw: () => void;
    appear: () => void;
    disappear: () => void;
    shimmer: () => void;
};

export function createPixel(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    color: string,
    baseSpeed: number,
    delay: number
): Pixel {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const p: Pixel = {
        x, y, color, ctx,
        speed: rand(0.1, 0.9) * baseSpeed,
        size: 0,
        sizeStep: Math.random() * 0.4,
        minSize: 0.5,
        maxSizeInt: 2,
        maxSize: rand(0.5, 2),
        delay,
        counter: 0,
        counterStep: Math.random() * 4 + (canvas.width + canvas.height) * 0.01,
        isIdle: false,
        isReverse: false,
        isShimmer: false,
        draw() {
            const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
        },
        appear() {
            p.isIdle = false;
            if (p.counter <= p.delay) {
                p.counter += p.counterStep;
                return;
            }
            if (p.size >= p.maxSize) p.isShimmer = true;
            if (p.isShimmer) p.shimmer();
            else p.size += p.sizeStep;
            p.draw();
        },
        disappear() {
            p.isShimmer = false;
            p.counter = 0;
            if (p.size <= 0) {
                p.isIdle = true;
                return;
            }
            p.size -= 0.1;
            p.draw();
        },
        shimmer() {
            if (p.size >= p.maxSize) p.isReverse = true;
            else if (p.size <= p.minSize) p.isReverse = false;
            if (p.isReverse) p.size -= p.speed;
            else p.size += p.speed;
        },
    };

    return p;
}
