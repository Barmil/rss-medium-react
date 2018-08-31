import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import newsPpaperImage from '../../resources/images/newsPaper.svg';
import './articleCard.css'

const articleCard = ({title, imageUrl, link, creator, publicationDate}) => {
  return (<Card className="article-card">
  <CardMedia className="article-card-media" image={imageUrl? imageUrl: newsPpaperImage} title={title}/>
    <CardContent className="article-card-content">
      <Typography gutterBottom variant="headline" component="h2">
      {title}
      </Typography>
      <Typography className="article-card-subheading" variant="subheading" color="textSecondary">
      <strong>{creator}</strong>
      {`, ${new Date(publicationDate).toLocaleString()}`}
    </Typography>
    </CardContent>
    <CardActions className="article-card-actions">
      <Button size="small" color="primary"
      onClick={()=> window.open(link)}>
        Go To Article
      </Button>
    </CardActions>
  </Card>)
};

export default articleCard;