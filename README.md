DEMO VIDEO: https://drive.google.com/drive/folders/1Eh3pVSfi8KzsKQ5bC8A-uBp98ogV6XRr 
# Inspiration
Most students don’t encounter machine learning until college. However, this typical track of Calculus 2 > Machine Learning may be outdated. With the development of powerful machine learning tools like IntersystemsML, complex mathematics is no longer necessary for a conceptual understanding of machine learning.

We make the bold claim that kids – even middle schoolers – can and should be exposed to machine learning concepts. With this goal, Whisker Workshops sets out to preserve precious machine learning insights while replacing formidable blocks of code and equations with cute hand-drawn graphics and games.

# What it does
Whisker Workshops consists of two main playground sections: one allows students to interactively build a neural network to represent the nonlinear exclusive or (XOR) gate while the other allows users to explore various dimensionality reduction levels for principal component analysis (PCA). We designed the UI to be cute and hand-drew graphics down to the buttons, aiming to foster a friendly and welcoming environment for beginners.

For the XOR gate playground, the truth table for the logic gate is given (no prior experience is assumed) — the goal is then to create a network to reproduce XOR. The playground is very visual: the user can see the entire neural network in real-time while updating neurons and edges. Edge weights can be updated by clicking on them, and the thickness of an edge visualizes its corresponding weight; the number of neurons is adjustable through a slider. Then, the player can run the network on different inputs and see how well they do: the task is essentially presented as a game of sorts!

The PCA playground (also known as “More Isn’t Always Better”) follows a similar visual philosophy: users can change the dimensionality of input data (Fashion MNIST dataset, images of clothes and accessories) and visualize how well the model performs through an interactive chart. Our friendly cat mentor also guides us through the entire process and explains why we observe the results we do!

# How we built it
All of the graphics and artwork in the final product were drawn by our team and incorporated into the website frontend built in React.JS and CSS.

The PCA playground was built by first conducting principal component analysis in Python on the Fashion MNIST dataset for a variety of output dimensionalities. We then used InterSystems IntegratedML to train a machine learning model for each of the resulting datasets. Through this process, we were delightfully surprised by the versatility of InterSystems IntegratedML’s capabilities. Not only was the model able to predict the 2-way XOR task, a classic non-linearity test, but it was also able to perform quite well on classifying MNIST fashion pieces, with no knowledge of what the input was.

The resulting accuracy data was then visualized through Chart.JS, a data visualization library in Javascript. The cat animations and dialogue were all created in CSS.

The XOR gate playground was designed primarily in React.JS, using a lot of different state logic and hooks to create the interactive neural network editor and interface for running the model. Due to the highly custom nature of the project, we manually implemented forward propagation for the network. All styling was done in CSS.

# Challenges we ran into
It was often difficult to create certain visual designs, effects and features with CSS: for example, the slider that demonstrates the results of Principal Component Analysis for different output dimensions. This was especially the case for importing our custom graphics and artwork into our project. This improved our debugging skills significantly and also taught us how to better utilize documentation to learn.

Another challenge we faced was navigating and running models on IntegratedML. We are very grateful for Thomas from Intersystems for his exceedingly helpful advice, allowing us to successfully train and validate the models we needed.

Accomplishments that we're proud of
We’re proud of having built a functional application with real-world value during this hackathon. As a team, we believe that Whisker Workshop isn’t just a toy project but a starting point for future AI education initiatives aimed at a younger audience. Our team is also proud to have explored and combined skills from a lot of different fields including machine learning, web development, data analysis, and graphic design.

Another accomplishment that we feel proud of is the fact that we incorporated the InterSystems IntegratedML framework into our project as this took us a lot of effort and research.

# What we learned
We learned how to make a stylish and customized UI and utilize CSS to its fullest extent; along with incorporating custom graphic design, we learned to create a product that would appeal to our target audience: children without technical knowledge interested in exploring machine learning. Thinking about our target audience was a skill we improved a lot throughout TreeHacks as we continually aimed to look at our product from users’ perspective.

Using InterSystems IntegratedML also taught us how to effectively use external tools to help build our product. Through the process, we had to read a lot of documentation and learn to understand the new paradigm presented by this specific system — this is a skill that is essential as programmers always use different tools and technologies to assist them.

We were also puzzled as to how to efficiently run the machine learning algorithm in real time after each update made by the user without taking a toll on the user’s computer or taking too long. We learned how to custom-build a machine learning algorithm without the conventional tools such as Tensorflow or Pytorch, which would be too inefficient to run each time. We eventually accomplished this by extracting only the features essential to the differentiation task with principal component analysis, and then coding up our own dense network.

# What's next for Whisker Workshop
We plan to expand this concept of abstractified ML to middle school and high school students who don’t have access to machine learning education. We hope to promote Whisker Workshop to elementary and middle school teachers, who can encourage their students to explore machine learning in their free time.

One extension is a playground for kids to create a multi-layer deep learning model that will perform image classification. For each layer, they will have options to input a dense or convolutional layer and sliders to tune hyperparameters — observing how different settings impact accuracy in this gamified and interactive environment will allow students to develop intuition about deep learning concepts (e.g. network architecture, activations, etc.).
