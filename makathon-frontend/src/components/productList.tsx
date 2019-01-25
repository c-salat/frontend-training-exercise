import * as React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductIngredients from './productIngredients';
import './productList.css'

interface Ingredient {
    id: string
    name: string
    price: number
}

interface Product {
    id: string
    name: string
    ingredients: Ingredient[]
}

interface ProductListProp {
    products: Product[]
}

const styles = {
    root: {
        width: '100%',
        marginTop: 10,
    },
    table: {
        minWidth: 700,
    },
};

export const ProductList: React.SFC<ProductListProp> = (props) => {
    console.log(props.products)
    return (
        <div id="product-list-wrapper">
            <h1>Produkte</h1>
            <Paper style={styles.root}>
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Ingredients</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.products.map(product => {
                            return (
                                <TableRow key={"product-" + product.id}>
                                    <TableCell component="th" scope="row">
                                        {product.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell className="product-ingredients">
                                        <ProductIngredients ingredients={product.ingredients}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};
