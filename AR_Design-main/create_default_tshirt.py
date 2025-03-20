from PIL import Image, ImageDraw
import os

def create_default_tshirt():
    # Create a new image with white background
    width, height = 500, 600
    image = Image.new('RGBA', (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)
    
    # T-shirt color
    tshirt_color = (200, 200, 200, 255)  # Light gray with full opacity
    
    # Draw the t-shirt shape
    # Neck
    neck_width = width // 5
    neck_height = height // 10
    neck_top = height // 10
    
    # Shoulders
    shoulder_width = width // 2
    shoulder_top = neck_top + neck_height
    
    # Body
    body_width = width // 1.5
    body_height = height // 1.5
    
    # Sleeves
    sleeve_width = width // 4
    sleeve_height = height // 5
    
    # Draw the t-shirt body (main rectangle)
    body_left = (width - body_width) // 2
    body_right = body_left + body_width
    body_top = shoulder_top
    body_bottom = body_top + body_height
    
    # Draw the main body
    draw.rectangle(
        [(body_left, body_top), (body_right, body_bottom)],
        fill=tshirt_color
    )
    
    # Draw the neck (semi-circle)
    neck_left = (width - neck_width) // 2
    neck_right = neck_left + neck_width
    draw.ellipse(
        [(neck_left, neck_top), (neck_right, neck_top + neck_height * 2)],
        fill=(255, 255, 255, 0),  # Transparent
        outline=None
    )
    
    # Draw left sleeve (trapezoid)
    left_sleeve_points = [
        (body_left, shoulder_top),  # Top inner point
        (body_left - sleeve_width, shoulder_top + sleeve_height // 2),  # Outer point
        (body_left - sleeve_width // 1.5, shoulder_top + sleeve_height),  # Bottom outer
        (body_left, shoulder_top + sleeve_height)  # Bottom inner
    ]
    draw.polygon(left_sleeve_points, fill=tshirt_color)
    
    # Draw right sleeve (trapezoid)
    right_sleeve_points = [
        (body_right, shoulder_top),  # Top inner point
        (body_right + sleeve_width, shoulder_top + sleeve_height // 2),  # Outer point
        (body_right + sleeve_width // 1.5, shoulder_top + sleeve_height),  # Bottom outer
        (body_right, shoulder_top + sleeve_height)  # Bottom inner
    ]
    draw.polygon(right_sleeve_points, fill=tshirt_color)
    
    # Save the image
    if not os.path.exists('assets'):
        os.makedirs('assets')
    
    image_path = 'default_tshirt.png'
    image.save(image_path)
    print(f"Default t-shirt image created at {image_path}")
    return image_path

if __name__ == "__main__":
    create_default_tshirt() 