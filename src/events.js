export async function getEvents() {
    return ('une phrase')
}
export function getLocation() {
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition);
        let position = navigator.geolocation.getCurrentPosition
        return position;
    }
}