import { createTheme, ThemeProvider } from "@mui/material/styles"
import {
    Alert,
    Button,
    Grid,
    LinearProgress,
    Paper,
    TextField,
} from "@mui/material"
import bnb_logo from "../assests/bnb_logo.svg"
import busd_logo from "../assests/busd-logo.svg"
import millify from "millify"
import Image from "next/image"

export const PresaleContent = ({
    rate,
    sold,
    bnbbal,
    busdbal,
    usdtbal,
    trxbal,
    error,
    trcbnb,
    trcbusd,
    trcusdt,
    trctrx,
    bnbusd,
    trxusd,
    bnbtext,
    busdtext,
    usdttext,
    trxtext,
    bnbChange,
    busdChange,
    usdtChange,
    trxChange,
    buyTRCwithBNB,
    buyTRCwithBUSD,
    buyTRCwithUSDT,
    buyTRCwithTRX,
    txhash,
    remainingtokens,
}) => {
    const manualTheme = createTheme({
        palette: {
            // type: "dark",
            primary: {
                main: "rgb(233, 209, 111)",
            },
            secondary: {
                main: "rgba(238,45,15,0.1)",
            },
            background: {
                // default: "#121414",
                // paper: "#121414",
            },
            text: {
                // primary: "#ffffff",
            },
        },
    })
    return (
        <ThemeProvider theme={manualTheme}>
            <Grid
                container
                item
                xl={12}
                direction="row"
                spacing={4}
                justify="center"
                alignItems="center"
            >
                <Paper
                    elevation={24}
                    style={{
                        backgroundColor: "rgba(225, 217, 209,0.5)",
                        // backgroundColor: "rgb(4, 30, 55)",
                        width: "100%",
                        padding: "20px",
                        margin: "20px",
                    }}
                >
                    <Grid container direction="column" align="center">
                        {sold >= 0 ? (
                            <Grid item>
                                <LinearProgress
                                    variant="determinate"
                                    value={sold / (remainingtokens + sold)}
                                    style={{ height: "25px" }}
                                    color="success"
                                />
                                <h4 style={{ color: "black" }}>
                                    {millify(sold)} TRC Sold
                                </h4>
                            </Grid>
                        ) : (
                            ""
                        )}
                        <Grid item>Current BNB/USD Price: ${bnbusd}</Grid>
                        <Grid item>Current TRX/USD Price: ${trxusd}</Grid>
                        <Grid item>
                            Balance: {bnbbal} BNB / {busdbal} BUSD / {usdtbal}{" "}
                            USDT / {trxbal} TRX
                        </Grid>
                        <Grid item>{rate / 100} USDT = 1 TRC</Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={4}
                        style={{ padding: "10px" }}
                    >
                        <Grid
                            container
                            item
                            direction="column"
                            md={6}
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Image
                                    src={bnb_logo}
                                    alt="BNB"
                                    height="100"
                                    width="100"
                                />
                            </Grid>
                            <Grid item>{trcbnb} TRC</Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="BNB"
                                    type="number"
                                    variant="outlined"
                                    value={bnbtext}
                                    onChange={bnbChange}
                                    InputLabelProps={{ shrink: true }}
                                    name="bnbtext"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={buyTRCwithBNB}
                                >
                                    Buy with BNB
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="column"
                            md={6}
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Image
                                    src={busd_logo}
                                    alt="BUSD"
                                    height="100"
                                    width="100"
                                />
                            </Grid>
                            <Grid item>{trcbusd} TRC</Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="BUSD"
                                    type="number"
                                    variant="outlined"
                                    value={busdtext}
                                    onChange={busdChange}
                                    InputLabelProps={{ shrink: true }}
                                    name="busdtext"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={buyTRCwithBUSD}
                                >
                                    Buy with BUSD
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            spacing={2}
                            justify="center"
                            alignItems="center"
                        ></Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        spacing={4}
                        style={{ padding: "10px" }}
                    >
                        <Grid
                            container
                            item
                            direction="column"
                            md={6}
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Image
                                    src="/usdt.png"
                                    alt="USDT"
                                    height="100"
                                    width="100"
                                />
                            </Grid>
                            <Grid item>{trcusdt} TRC</Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="USDT"
                                    type="number"
                                    variant="outlined"
                                    value={usdttext}
                                    onChange={usdtChange}
                                    InputLabelProps={{ shrink: true }}
                                    name="usdttext"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={buyTRCwithUSDT}
                                >
                                    Buy with USDT
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="column"
                            md={6}
                            spacing={3}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Image
                                    src="/trx.png"
                                    alt="TRX"
                                    height="100"
                                    width="100"
                                />
                            </Grid>
                            <Grid item>{trctrx} TRC</Grid>
                            <Grid item>
                                <TextField
                                    id="outlined-number"
                                    label="TRX"
                                    type="number"
                                    variant="outlined"
                                    value={trxtext}
                                    onChange={trxChange}
                                    InputLabelProps={{ shrink: true }}
                                    name="trxtext"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={buyTRCwithTRX}
                                >
                                    Buy with TRX
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            spacing={2}
                            justify="center"
                            alignItems="center"
                        ></Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={5}
                    >
                        <Grid item>
                            {error ? (
                                <Alert severity="error">
                                    {error["message"]}
                                </Alert>
                            ) : txhash !== 0 ? (
                                <Alert severity="success">
                                    Bought TRC Successfully,{" "}
                                    <a
                                        href={
                                            "https://bscscan.com/tx/" + txhash
                                        }
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        check here
                                    </a>
                                </Alert>
                            ) : (
                                ""
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider>
    )
}
