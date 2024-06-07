
 export function makePassword() {
        return Math.random().toString(32).slice(-8)
}
