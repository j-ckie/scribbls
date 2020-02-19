import React, { Component } from 'react';
import PropTypes from "prop-types";
import icon from "../img/scribblr.png";
import axios from "axios";
import { Link } from "react-router-dom";

// ======= Material UI =======
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        width: 100,
        margin: "20px 0 20px 0"
    },
    pageTitle: {
        margin: "10px 0 10px 0"
    },
    textField: {
        margin: "10px 0 10px 0"
    },
    button: {
        marginTop: 20,
        position: "relative"
    },
    customError: {
        color: "red",
        fontSize: "0.8rem"
    },
    smallText: {
        color: "gray"
    },
    progress: {
        position: "absolute"
    }
}

class signup extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            loading: false,
            errors: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post("/signup", newUserData)
            .then(res => {
                // console.log(res.data);
                localStorage.setItem("fireBaseIDToken", `Bearer ${res.data.token}`)
                this.setState({
                    loading: false
                });
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={icon} alt="logo" className={classes.image} />
                    <Typography
                        variant="h2" className={classes.pageTitle}>
                        Signup
                        </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            variant="outlined"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            required
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            required
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm password"
                            variant="outlined"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}>
                            Submit
                                {loading && (
                                <CircularProgress size={20} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small className={classes.smallText}>Already have an account? Login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);
