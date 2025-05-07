export const sleep =  {
    ms: (timeout: number) => sleepMs(timeout),
    s: (timeout: number) => sleepMs(timeout * 1000)
}

async function sleepMs (timeout: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout)
    })
};