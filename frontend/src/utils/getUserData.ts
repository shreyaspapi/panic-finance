
import axios from "axios";

export default async function getUserData(address: string) {
    const response = await axios({
        method: "get",
        url: "https://api.covalenthq.com/v1/5/address/" + address + "/balances_v2/?key=" + "ckey_dbb58e173b114f819edc037f2bc",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
}