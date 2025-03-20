# T-Shirt Design Application

This application allows users to create custom T-shirt designs with an interactive drawing tool and AI-generated mockups. It also includes a virtual try-on feature to see how the designs look when worn.

## Features

- Interactive drawing canvas
- Text addition with customizable size and color
- T-shirt color selection
- AI-generated realistic T-shirt mockups
- Virtual try-on functionality using webcam
- Web interface to launch both applications

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Set up your API key for image generation:

Create a `.env` file in the project directory with the following content:

```
IMAGE_GEN_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Stability AI API key.

3. For the virtual try-on feature, you'll need to download the OpenPose model files:

   - Download `pose_iter_440000.caffemodel` and `pose_deploy_linevec.prototxt` from the [OpenPose repository](https://github.com/CMU-Perceptual-Computing-Lab/openpose/tree/master/models)
   - Place these files in the `models` directory

## Usage

1. Start the web server:

```bash
python server.py
```

2. Open your web browser and navigate to:

```
http://localhost:5000
```

3. Choose one of the following options:

   - Click the "Launch T-Shirt Designer" button to start the design application
   - Click the "Virtual Try-On" button to try on your designs using your webcam

### T-Shirt Designer

1. Use the drawing tools to create your design, add text, and customize the T-shirt.
2. Click "Generate T-Shirt Design" to create an AI-generated mockup of your design.
3. Your designs will be saved in the `generated_designs` directory.

### Virtual Try-On

1. The application will use your webcam to detect your body.
2. It will overlay your most recent T-shirt design (or a default T-shirt if none exists).
3. Use the on-screen controls to adjust the fit and position of the garment.
4. Press 'q' to quit the application.

## System Requirements

- Python 3.6 or higher
- Tkinter (usually comes with Python installation)
- Webcam for the virtual try-on feature
- Web browser with JavaScript enabled

## Troubleshooting

If you encounter any issues:

- Make sure all dependencies are installed correctly
- Verify that your API key is set up properly
- Check that port 5000 is not being used by another application
- For virtual try-on issues, ensure your webcam is working and accessible
- If the OpenPose models aren't working, the application will fall back to a simpler pose estimation method 