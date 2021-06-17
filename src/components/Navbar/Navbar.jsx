import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();  // using this hook to make sure when we are at '/cart' we remove the cart icon 

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src='https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80' alt='Commerce.js' height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname==='/' && (   // if we are at '/' home page we show the cart button .. && is react AND operation similar to ? operator
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart item" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>            
        </>
    )
};


export default Navbar
