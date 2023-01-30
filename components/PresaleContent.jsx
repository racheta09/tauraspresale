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
    sold,
    bnbbal,
    busdbal,
    error,
    cknbnb,
    cknbusd,
    bnbusd,
    bnbtext,
    busdtext,
    bnbChange,
    busdChange,
    buyCKNwithBNB,
    buyCKNwithBUSD,
    txhash,
    remainingtokens,
}) => {
    const manualTheme = createTheme({
        palette: {
            // type: "dark",
            primary: {
                main: "rgba(255,61,38,0.5)",
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
                                    {millify(sold)} CKN Sold
                                </h4>
                            </Grid>
                        ) : (
                            ""
                        )}
                        <Grid item>Current BNB/USD Price: ${bnbusd}</Grid>
                        <Grid item>
                            Balance: {bnbbal} BNB / {busdbal} BUSD
                        </Grid>
                        <Grid item>1 BNB = 10,000,000 CKN</Grid>
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
                            <Grid item>{cknbnb} CKN</Grid>
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
                                    onClick={buyCKNwithBNB}
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
                            <Grid item>{cknbusd} CKN</Grid>
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
                                    onClick={buyCKNwithBUSD}
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
                                    Bought CKN Successfully,{" "}
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
