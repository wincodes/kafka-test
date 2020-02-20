const express = require('express');
const Kafka = require('node-rdkafka')

const app = express();

app.get('/', (req, res) => {
  res.status(200).json('Hello World');
})

app.get('/kafka', (req, res) => {
  var stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
  }, {}, {
    topic: 'article_created'
  });
  
  // Writes a message to the stream
  var queuedSuccess = stream.write(Buffer.from(JSON.stringify({
      id: 519,
      user_id: 1,
      discussion: `Arteta was alongside Guardiola on Wednesday as the Premier League champions won 3-1 at 
                  Oxford to reach the League Cup semi-finals.`,
      created_at: '2019-05-09 12:40:18',
      article: {
        id: 326,
        title: 'WANT MORE THAN ONE IMAGE IN THE BODY',
        slug: 'want-more-than-one-image-in-the-body',
        image_url:
          'https://res.cloudinary.com/bloverse/image/upload/v1570163897/local/vlk65zcilklz7sqcilfy.png',
      },
      category_id: 10,
      country_id: 5,
      author: {
        first_name: 'Joe',
        last_name: 'David',
        image_url:
          'https://res.cloudinary.com/bloverse/image/upload/v1557828993/local/wrefirmnfssjlqggxk4t.jpg',
      },
  })));
  
  if (queuedSuccess) {
    console.log('We queued our message!');
  } else {
    // Note that this only tells us if the stream's queue is full,
    // it does NOT tell us if the message got to Kafka!  See below...
    console.log('Too many messages in our queue already');
  }
  
  // NOTE: MAKE SURE TO LISTEN TO THIS IF YOU WANT THE STREAM TO BE DURABLE
  // Otherwise, any error will bubble up as an uncaught exception.
  stream.on('error', function (err) {
    // Here's where we'll know if something went wrong sending to Kafka
    console.error('Error in our kafka stream');
    console.error(err);
  })

  res.send("kafka sent successfully")
});



app.listen(5004, () => {
  console.log(`server started on port 5004`)
})

module.exports =  app;