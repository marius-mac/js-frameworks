# WE CAN CODE!

**Pradinis variantas**: https://github.com/akimirka/wecancode-intermediate-start.git


**Galutinis variantas**: https://github.com/akimirka/wecancode-intermediate-start/tree/final-project

## Praktinis darbas

1. Aplikacijos atidarymas ir paleidimas
    * 1.1  Einame į https://codesandbox.io/s/github
    * 1.2  Nurodome repozitorijos URL: https://github.com/akimirka/wecancode-intermediate-start.git
    * 1.3  Sėkmingai atidarius aplikaciją turėtume matyti pradinį aplikacijos puslapį

![pirmas pavyzdys](/tutorial-images/1.png)

2.  **Komponento sukūrimas**
    * 2.1  *src -> components -> Create Directory -> “card”.* *Card* direktorijoje sukuriame failus *card.js*, *card.module.scss*, *index.js*

    ![pirmas pavyzdys](/tutorial-images/2.png)
    * 2.2   
    ```
    import React from "react";
    import MaterialCard from "@material-ui/core/Card";
    import CardMedia from "@material-ui/core/CardMedia";
    import CardContent from "@material-ui/core/CardContent";
    import Typography from "@material-ui/core/Typography";

    const Card = () => (
      <MaterialCard>
        <CardMedia
            image="https://www.visitberlin.de/system/files/styles/visitberlin_teaser_full_width_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=tD4ERppn"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Berlin
                </Typography>
                <Typography component="p">
                  Berlin buzzes with an energy unmatched anywhere else in the world.
                </Typography>
              </CardContent>
        </MaterialCard>
    );

    export default Card;
    ```
    * 2.3 Papildome index.js:
    ```
    export { default } from './card';
    ```
    * 2.4 Įtraukiame card komponentą į *app.js*, o failo viršuje importuojame komponentą:
    ```
    import Card from "./components/card";
    ```

    Kad matytume Card komponentą puslapyje, panaudojame šį komponentą *app.js* render() metodo viduje. Pakeičiame “Welcome...” tekstą į: 
    ```
    <Card />
    ```
    * 2.5 Stilius galima perkelti į *components/card/card.module.scss*, o *card.js* pridedame:
    ```
    import styles from "./card.module.scss";
    ```

    Aprašome stilių card.module.scss:

    ```
    .media {
      height: 200px;
    }
    ```
    *CardMedia* komponente nurodome parametrą su stiliaus klase - *styles.media*.
    ```
        <CardMedia className={styles.media} ... />
    ```
    * 2.6 Sukuriame parametrus *(props)* card komponentui:

        *components/card/card.js:*


        Vietoje
        ```const Card=()=>(```

        Parašome
        ```
        const Card = ({ title, description, imageSrc }) => (
        ```
        Pakeičiame tekstus į kintamuosius *{title}*, *{description}*, *{imageSrc}*:
        ```
        <MaterialCard>
          <CardMedia className={styles.media} image={imageSrc} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">{description}</Typography>
            </CardContent>
        </MaterialCard>
        ```
        App.js:
        ```
        <Card
            title="Berlin"
            description="Berlin buzzes with an energy unmatched anywhere else in the world."
            imageSrc="https://www.visitberlin.de/system/files/styles/visitberlin_teaser_full_width_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=tD4ERppn"
        />
        ```

3.  **Sąrašas (tweet list)**
    * 3.1 Sukuriame direktoriją *components/tweet-list*. Joje sukuriame failus *index.js*, *tweet-list.js*, *tweet-list.module.scss*
    * 3.2 Papildome *tweet-list.js*:
    ```
    import React from "react";
    import Card from "../card";

    class TweetList extends React.Component {
      state = {
        tweets: [{
            imageUrl: "https://www.visitberlin.de/system/files/styles/visitberlin_teaser_full_width_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=tD4ERppn",
        title: "Berlin",
        description: "Berlin buzzes with an energy unmatched anywhere else in the world."
                }]
    };

      renderTweets = () => {
        const { tweets } = this.state;

        return tweets ? Object.keys(tweets).map(id => (
          <Card
                    key={id}
                    imageSrc={tweets[id].imageUrl}
                    title={tweets[id].title}
                    description={tweets[id].description} />
        )) : null;
      };

      render() {
        return <div>{this.renderTweets()}</div>;
      }
    }

    export default TweetList;
    ```
    * 3.3 *components/tweet-list/index.js*:
    ```
    export { default } from "./tweet-list";
    ```
    * 3.4 Įtraukiame *TweetList* komponentą į *app.js*:
    ```
    import TweetList from "./components/tweet-list";
    ```
    *render()* metodo viduje
    

    vietoj 
    ```
    <div className={styles.content}> <Card …. /> </div>
    ```
    parašome
    ```
    <div className={styles.content}> <TweetList /> </div>
    ```
    * 3.5 Pridedame stilius *tweet-list.module.scss*:
    ```
    .cardGrid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    ```
    *tweet-list.js:*
    ```
    import styles from "./tweet-list.module.scss"
    ```

    *tweet-list.js* nurodome klasę render() metodo *div* elementui:
    ```
    	className={styles.cardGrid}
    ```
    *Card.module.scss:*
    ```
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: 10px;
    }
    ```

    *Card.js* faile, *MaterialCard* elementui nurodome klasę:
    ```
    className={styles.card}
    ```
4.  **Paėmimas iš DB**

    *Pastaba:* kreipiniai į DB jau yra aprašyti config/firebase.js, pvz:
    ```
    export const tweetsRef = databaseRef.child("tweets");
    ```
    * 4.1 Pakeičiame statinius tweets duomenis *tweet-list.js* faile
    ```
    import { tweetsRef } from "../../config/firebase";
    ```
    TweetList klasėje nurodome:
    ```
    state = {
        tweets: null
    };
    ```
    Pridedame naują metodą:
    ```
    componentDidMount() {
      tweetsRef.on("value", snapshot => {
      const tweets = snapshot.val();
      this.setState({ tweets });
      });
    }
    ```
    *Pastaba:* Jei matote klaidą *Firebase: Firebase App named '[DEFAULT]' already exists
    (app/duplicate-app)* - atnaujinkinte codesandbox naršyklės vaizdą

5.  **Pridėjimo forma**

    *Pastaba:* iššokančią formą darysime naudodamiesi *Material UI* komponentu *Modal*: https://material-ui.com/api/modal/

    * 5.1 Sukuriame direktoriją *components/tweet-form* ir failus joje: *index.js*, *tweet-form.js*, *tweet-form.module.scss*
    * 5.2 Papildome tweet-form.js:
    ```
    import React from "react";
    import Modal from "@material-ui/core/Modal";

    import styles from "./tweet-form.module.scss";

    class TweetForm extends React.Component {

      render() {
        return (
          <Modal open={true}>
            <div> Pridėjimo forma </div>
          </Modal>
        );
       }
      }

    export default TweetForm;
    ```
    * 5.3 *index.js*:
    ```
    export { default } from "./tweet-form";
    ```
    * 5.4 *app.js* pridedame šią formą:
    ```
    import TweetForm from "./components/tweet-form";
    ```

    Po sąrašo komponentu TweetList render() metode pridedame formos komponentą TweetForm:
    ```
    <div className={styles.content}>
      <TweetList />
      <TweetForm />
    </div>
    ```
    * 5.5 Sutvarkome stilius: 
    
    *components/tweet-form/tweet-form.js* *render()* metode pridedame klasę *modal*:
    ```
    render() {
      return (
        <Modal open={true}>
          <div className={styles.modal}> Pridėjimo forma </div>
        </Modal>
      );
    }
    ```

     components/tweet-form/tweet-form.module.scss pridedame:

     ```
     .modal {
        position: absolute;
        top: 200px;
        left: calc(50% - 240px);
        display: flex;
        flex-direction: column;
        width: 480px;
        background-color: white;
        border-radius: 10px;
        overflow: hidden;
        padding: 40px;
        outline: none;
    }   
     ```

    * 5.6 Papildome *components/tweet-form/tweet-form.js* *render()* metodą:
    ```
    const { isOpen, onClose } = this.props;
    ...
    return (
        <Modal open={isOpen} onClose={onClose}>
          <div className={styles.modal}> Pridėjimo forma </div>
        </Modal>
    )
    ...
    ```
    *App.js* (https://material-ui.com/api/button/):

    ```
    import Button from "@material-ui/core/Button";
    ...
    state = {
      isFormOpen: false
    };

    openForm = () => {
      this.setState({ isFormOpen: true });
    };

    closeForm = () => {
      this.setState({ isFormOpen: false });
    };

    ...


    <div className={styles.content}>
      <TweetList />
      <TweetForm isOpen={this.state.isFormOpen} onClose={this.closeForm} />
    </div>
    <Footer>
      <Button
        color="primary"
        variant="extendedFab"
        aria-label="Create"
        onClick={this.openForm}
        >
        Create new destination
      </Button>
    </Footer>
    ```

    * 5.7 Galime pridėti ikoną *App.js*:
    ```
    import CreateIcon from "@material-ui/icons/Create";
    ...
    <Button
        color="primary"
        variant="extendedFab"
        aria-label="Create"
        onClick={this.openForm}
    >
    <CreateIcon />
    Create new destination
    </Button>
    ```
    * 5.8 Formos laukai - *tweet-form.js*:
    ```
    import TextField from "@material-ui/core/TextField";

    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className={styles.modal}>
          <div>
            <TextField label="Title" variant="outlined" required />
            <TextField
                label="Description"
                multiline
                variant="outlined"
                required
            />
            <TextField label="Image url" variant="outlined" required />
        </div>
        </div>
      </Modal>
    );
    ```

    * 5.9 Sutvarkome input stilių: pridedame kiekvienam *TextField* parametrą *className={styles.input}*  *div*, kuris apgaubia visus *TextField: className={styles.form}*. Aprašome *input* klasės stilius *tweet-form.module.scss*:
    ```
    .form {
        display: flex;
        flex-direction: column;
    }

    .input {
        margin: 10px 0;
    }
    ```

    * 5.10 *tweet-form.js:*
    ```
    import Button from '@material-ui/core/Button';
    ```

    Po formos *div* pridedame mygtukus:
    ```
    <div>
      <Button variant="outlined">Cancel</Button>
      <Button variant="outlined" color="primary">
        Save
      </Button>
    </div>
    ```

    * 5.11 Pridedame mygtukus gaubiančiam *div* ir patiems mygtukams klases:
    ```
    <div className={styles.actions}>
      <Button className={styles.button} variant="outlined">
        Cancel
    ...
    ```

    Aprašome klasių stilius tweet-form.module.scss:
    ```
    .actions {
        display: flex;
        margin: 10px 0;
    }

    .button {
        flex: 1;
        margin: 0 10px;
    }
    ```
    * 5.12 Mygtukų funkcionalumas:
    ```
     <Button
        className={styles.button}
        variant="outlined"
        onClick={onClose}
    >
      Cancel
    </Button>
    <Button
        className={styles.button}
        variant="outlined"
        color="primary"
        onClick={this.handleSave}
    >
      Save
    </Button>

    ...
    ```

    *TweetForm* komponente:

    ```
    handleSave = () => {
      console.log("Save event, yey!");
    };
    ```
    Aprašome *TweetForm* state:
    ```
    state = {
        title: "",
        description: "",
        imageUrl: ""
    };
    ```
    Pridedame *TextField* komponentams parametrus:
    ```
    <TextField
        label="Title"
        variant="outlined"
        className={styles.input}
        value={this.state.title}
        onChange={this.handleChange("title")}
        required
    />
    ```
    taip pat ir *description*, *imageUrl*:

    ```
        ...
        onChange={this.handleChange("description")}
        value={this.state.description}
        ...
        onChange={this.handleChange("imageUrl")}
        value={this.state.imageUrl}
    ```
    TweetForm komponente pridedame (keičiame state įvedimo metu):
    ```
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value
      });
    };
    ```
    State galime pasiekti ir handleSave():

    ```
    handleSave = () => {
      const { title, description, imageUrl } = this.state;
      console.log(title, description, imageUrl);
    };
    ```
6.  **Išsaugojimas į DB**

    *Pastaba*: funkcionalumas, susijęs su duomenų operacijomis, yra *src/actions/index.js* 

    * 6.1 *tweet-form.js*:
    ```
    import { addTweet } from '../../actions';
	```	
	Papildome TweetForm komponentą:
    ```
    saveTweet = (title, description, imageUrl) => {
    const tweet = {
            title,
            description,
            imageUrl
    };
    addTweet(tweet).then(() => this.setState(this.props.onClose));
    };

    ```
	Pakviečiame *saveTweet()* metodą *handleSave()* metode:

    ```
    handleSave = () => {
    const { title, description, imageUrl } = this.state;
      if (!title || !description || !imageUrl) {
        return;
        }
      this.saveTweet(title, description, imageUrl);
    };
    ```
7.  **Delete**
    * 7.1 Pridedame delete mygtuką *components/card/card.js*:
    ```
    import CardActions from '@material-ui/core/CardActions';
    import IconButton from '@material-ui/core/IconButton';
    import DeleteIcon from "@material-ui/icons/Delete";
    ```
    Pridedame *Card* parametrus *isMine*, *onDelete* ir įdedame actions po *CardContent*:
    ```
    const Card = ({ title, description, imageSrc, isMine, onDelete }) => (

    ...

    <CardActions className={styles.actions} disableActionSpacing>
      {isMine && (
        <IconButton onClick={onDelete} className={styles.delete}>
        <DeleteIcon />
        </IconButton>
      )}
    </CardActions>
    ```

    Nurodome pridėtus parametrus *components/tweet-list/tweet-list.js*, kur šis komponentas kviečiamas:

    ```
    import { removeTweet, isTweetOwner } from "../../actions";
    ...
    ```

    *render Tweets()* metode *Card*:
    ```
    onDelete={() => removeTweet(id)}
    isMine={isTweetOwner(tweets[id])}
    ```
8.  **Like**
    * 8.1 *components/card.js*:
    ```
    import FavoriteIcon from "@material-ui/icons/Favorite";
    ...
    <CardActions className={styles.actions} disableActionSpacing>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <Typography component="p" />
    {isMine && (    
    ...   
    ```
    * 8.2 *Card.js*:
    ```
    import NotFavoriteIcon from "@material-ui/icons/FavoriteBorder";
    ```
	*Card.js* *const Card* pridedame parametrus *isLiked*, *toggleLike*, *likesCount*:
    ```
    const Card = ({
        imageSrc,
        title,
        description,
        onDelete,
        isMine,
        toggleLike,
        likesCount,
        isLiked,
    })

    ```

    Po *<CardActions …*:
    ```
    <IconButton onClick={toggleLike}>
      {isLiked ? <FavoriteIcon /> : <NotFavoriteIcon />}
    </IconButton>
    <Typography component="p">{likesCount}</Typography>
    ```
    *Tweet-list.js*, kur kviečiamas card komponentas, nurodome šiuos parametrus su reikšmėmis iš aprašytų actions (*actions/index.js*):
    ```
    import { removeTweet, isTweetOwner, toggleTweetLike, isTweetLiked } from '../../actions';
	...
	<Card
        key={id}
        imageSrc={tweets[id].imageUrl}
        title={tweets[id].title}
        description={tweets[id].description}
        onDelete={() => removeTweet(id)}
        isMine={isTweetOwner(tweets[id])}
        toggleLike={() => toggleTweetLike(id)}
        likesCount={tweets[id].likesCount}
        isLiked={isTweetLiked(tweets[id])}
    />

    ```
### Setup on local environment 
* clone repo.
* npm install.

* npm run start
* open http://localhost:3000/