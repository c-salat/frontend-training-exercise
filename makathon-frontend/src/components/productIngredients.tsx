import * as React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Ingredient {
    id: string
    name: string
    price: number
}

interface Ingredients {
    ingredients: Ingredient[]
}

interface StateProps {
    open: boolean
}

class ProductIngredients extends React.Component<Ingredients, StateProps> {

    public state = {
        open: false,
    };

    constructor(props: Ingredients) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Button onClick={() => this.handleClickOpen()}>Show ingredients</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Ingredients"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.ingredients.map(val => {
                                return (
                                    <div className="product-ingredient" key={val.id}>
                                        <ul>
                                            <li>ID: {val.id}</li>
                                            <li>Name: {val.name}</li>
                                            <li>Price: {val.price.toFixed(2)} $</li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    private handleClickOpen = () => {
        this.setState({open: true});
    }

    private handleClose = () => {
        this.setState({ open: false });
    }

}

export default ProductIngredients;
