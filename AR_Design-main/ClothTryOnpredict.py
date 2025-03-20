import cv2
import numpy as np
import argparse
import time
import sys
import os
from pathlib import Path

# Constants
MODEL_DIR = "models"
TEMP_DIR = "temp"

def parse_args():
    parser = argparse.ArgumentParser(description='Advanced Virtual Try-On')
    parser.add_argument('--garment', type=str, required=True, help='Path to garment image')
    parser.add_argument('--webcam', type=int, default=0, help='Webcam index to use')
    parser.add_argument('--resolution', type=str, default='640x480', help='Camera resolution')
    return parser.parse_args()

class HumanPoseEstimator:
    """Human pose estimation using OpenPose or similar model"""
    
    def __init__(self):
        # Create model directory if it doesn't exist
        if not os.path.exists(MODEL_DIR):
            os.makedirs(MODEL_DIR)
        
        # Download pose model if not present (simplified here)
        self.download_models_if_needed()
        
        # Load COCO body model for OpenPose
        self.BODY_PARTS = {
            "Nose": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
            "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
            "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "REye": 14,
            "LEye": 15, "REar": 16, "LEar": 17, "Background": 18
        }
        
        self.POSE_PAIRS = [
            ["Neck", "RShoulder"], ["Neck", "LShoulder"], ["RShoulder", "RElbow"],
            ["RElbow", "RWrist"], ["LShoulder", "LElbow"], ["LElbow", "LWrist"],
            ["Neck", "RHip"], ["RHip", "RKnee"], ["RKnee", "RAnkle"], ["Neck", "LHip"],
            ["LHip", "LKnee"], ["LKnee", "LAnkle"], ["Neck", "Nose"], ["Nose", "REye"],
            ["REye", "REar"], ["Nose", "LEye"], ["LEye", "LEar"]
        ]
        
        # Load OpenPose network
        self.net = self.load_pose_model()
        
        print("Pose estimation model loaded successfully")
    
    def download_models_if_needed(self):
        """Download models if not present"""
        # Model paths
        pose_model_path = os.path.join(MODEL_DIR, "pose_iter_440000.caffemodel")
        pose_proto_path = os.path.join(MODEL_DIR, "pose_deploy_linevec.prototxt")
        
        # Check if models exist
        if not os.path.exists(pose_model_path) or not os.path.exists(pose_proto_path):
            print("Models not found. Downloading pose estimation models...")
            # Normally we'd download the models here using requests or urllib
            # For this example, we'll direct the user to download them manually
            print("Please download the OpenPose model:")
            print(f"1. Download pose_iter_440000.caffemodel to {MODEL_DIR}")
            print(f"2. Download pose_deploy_linevec.prototxt to {MODEL_DIR}")
            print("Models can be found at: https://github.com/CMU-Perceptual-Computing-Lab/openpose/tree/master/models")
            
            # Create directory for models
            Path(MODEL_DIR).mkdir(parents=True, exist_ok=True)
            
            # For demonstration, we'll create dummy files with instructions
            with open(pose_proto_path, 'w') as f:
                f.write("# Download the actual model file from OpenPose repository")
            with open(pose_model_path, 'w') as f:
                f.write("# Download the actual model file from OpenPose repository")
                
            print("Created placeholder files. Replace with actual model files before running.")
    
    def load_pose_model(self):
        """Load the pose detection model"""
        try:
            # Try to load the OpenPose model
            model_path = os.path.join(MODEL_DIR, "pose_iter_440000.caffemodel")
            config_path = os.path.join(MODEL_DIR, "pose_deploy_linevec.prototxt")
            
            if os.path.getsize(model_path) < 1000:  # Placeholder file
                print("Warning: Using placeholder model file. Results will be simulated.")
                # Fall back to a basic pose estimation
                return None
            
            net = cv2.dnn.readNetFromCaffe(config_path, model_path)
            
            # Try to use GPU if available - safely check for CUDA availability
            try:
                # Check if CUDA is available by testing if the cv2.cuda module exists
                cuda_available = False
                if hasattr(cv2, 'cuda'):
                    try:
                        cuda_available = cv2.cuda.getCudaEnabledDeviceCount() > 0
                    except:
                        cuda_available = False
                
                if cuda_available:
                    print("CUDA is available. Using GPU acceleration.")
                    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
                    net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
                else:
                    print("CUDA is not available. Using CPU.")
                    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_DEFAULT)
                    net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)
            except Exception as cuda_err:
                print(f"Error checking CUDA availability: {cuda_err}. Using CPU instead.")
                net.setPreferableBackend(cv2.dnn.DNN_BACKEND_DEFAULT)
                net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)
                
            return net
        except Exception as e:
            print(f"Error loading pose model: {e}")
            print("Falling back to simulation mode")
            return None
    
    def estimate_pose(self, frame):
        """Estimate human pose in the frame"""
        frame_height, frame_width = frame.shape[:2]
        
        # If we don't have the actual model, simulate pose detection
        if self.net is None:
            return self.simulate_pose(frame)
        
        # Prepare input for the network
        input_blob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (368, 368), (0, 0, 0), swapRB=False, crop=False)
        self.net.setInput(input_blob)
        
        # Forward pass through the network
        output = self.net.forward()
        
        # Parse keypoints
        keypoints = []
        threshold = 0.1
        
        for i in range(len(self.BODY_PARTS) - 1):  # Exclude background
            # Get confidence map
            prob_map = output[0, i, :, :]
            prob_map = cv2.resize(prob_map, (frame_width, frame_height))
            
            # Find global maximum
            _, confidence, _, point = cv2.minMaxLoc(prob_map)
            
            if confidence > threshold:
                keypoints.append((point[0], point[1], confidence))
            else:
                keypoints.append(None)
        
        return keypoints
    
    def simulate_pose(self, frame):
        """Simulate pose detection when model isn't available"""
        # Use face detection to estimate body position
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        # Initialize keypoints
        keypoints = [None] * (len(self.BODY_PARTS) - 1)
        
        if len(faces) > 0:
            # Get the largest face
            x, y, w, h = max(faces, key=lambda rect: rect[2] * rect[3])
            
            # Center of face
            face_center_x = x + w // 2
            face_center_y = y + h // 2
            
            # Estimate keypoints based on face position
            frame_height, frame_width = frame.shape[:2]
            
            # Nose (center of face)
            keypoints[self.BODY_PARTS["Nose"]] = (face_center_x, face_center_y, 0.9)
            
            # Neck (below face)
            neck_y = y + h + h // 4
            keypoints[self.BODY_PARTS["Neck"]] = (face_center_x, neck_y, 0.8)
            
            # Shoulders (on either side of neck)
            shoulder_y = neck_y + h // 8
            keypoints[self.BODY_PARTS["RShoulder"]] = (face_center_x - w, shoulder_y, 0.7)
            keypoints[self.BODY_PARTS["LShoulder"]] = (face_center_x + w, shoulder_y, 0.7)
            
            # Approximate other body parts
            keypoints[self.BODY_PARTS["RHip"]] = (face_center_x - w//2, frame_height - h*2, 0.5)
            keypoints[self.BODY_PARTS["LHip"]] = (face_center_x + w//2, frame_height - h*2, 0.5)
            
        return keypoints
    
    def draw_skeleton(self, frame, keypoints):
        """Draw skeleton on the frame for visualization"""
        # Draw keypoints
        for i, keypoint in enumerate(keypoints):
            if keypoint:
                cv2.circle(frame, (int(keypoint[0]), int(keypoint[1])), 8, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        
        # Draw connections
        for pair in self.POSE_PAIRS:
            part_from = self.BODY_PARTS[pair[0]]
            part_to = self.BODY_PARTS[pair[1]]
            
            if keypoints[part_from] and keypoints[part_to]:
                cv2.line(frame, 
                         (int(keypoints[part_from][0]), int(keypoints[part_from][1])),
                         (int(keypoints[part_to][0]), int(keypoints[part_to][1])),
                         (0, 255, 0), 3)
        
        return frame

class GarmentProcessor:
    """Process garment images for virtual try-on"""
    
    def __init__(self):
        # Create temp directory for processed images
        if not os.path.exists(TEMP_DIR):
            os.makedirs(TEMP_DIR)
    
    def load_garment(self, path):
        """Load and preprocess a garment image"""
        # Load the image
        garment = cv2.imread(path, cv2.IMREAD_UNCHANGED)
        
        if garment is None:
            raise FileNotFoundError(f"Could not load garment image from {path}")
        
        # If garment doesn't have alpha channel, add one
        if garment.shape[2] == 3:
            garment = self.remove_background(garment)
        
        return garment
    
    def remove_background(self, img):
        """Remove background from garment image including black backgrounds"""
        # Convert to RGBA
        rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
        
        # Get image dimensions
        h, w = img.shape[:2]
        
        # Create an initial mask
        # Instead of simple thresholding which fails for black clothes,
        # we'll use a combination of techniques
        
        # 1. Start with an approximate mask using color detection
        # Convert to different color spaces
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Create masks for different color spaces
        # Detect very dark regions (potential black backgrounds)
        _, dark_mask = cv2.threshold(gray, 30, 255, cv2.THRESH_BINARY)
        
        # Detect edges - useful for finding garment boundaries
        edges = cv2.Canny(img, 50, 150)
        kernel = np.ones((5,5), np.uint8)
        dilated_edges = cv2.dilate(edges, kernel, iterations=2)
        
        # Create initial GrabCut mask
        # 0 = background, 1 = foreground, 2 = probable background, 3 = probable foreground
        gc_mask = np.zeros(img.shape[:2], np.uint8)
        
        # Mark the borders as likely background
        border_width = w // 10  # 10% of width
        gc_mask[:border_width, :] = 2
        gc_mask[-border_width:, :] = 2
        gc_mask[:, :border_width] = 2
        gc_mask[:, -border_width:] = 2
        
        # Mark the center as likely foreground
        center_rect = (border_width, border_width, w - 2*border_width, h - 2*border_width)
        cv2.rectangle(gc_mask, (center_rect[0], center_rect[1]), 
                     (center_rect[0] + center_rect[2], center_rect[1] + center_rect[3]), 3, -1)
        
        # Use edges to refine foreground
        gc_mask[dilated_edges > 0] = 1
        
        # Initialize GrabCut background and foreground models
        bgd_model = np.zeros((1, 65), np.float64)
        fgd_model = np.zeros((1, 65), np.float64)
        
        # Run GrabCut algorithm
        try:
            cv2.grabCut(img, gc_mask, center_rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_MASK)
        except Exception as e:
            print(f"GrabCut failed: {e}. Using fallback method.")
            # Fallback to simpler method if GrabCut fails
            # Create a simple mask based on color threshold
            _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
            kernel = np.ones((5, 5), np.uint8)
            mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
            mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
            rgba[:, :, 3] = mask
            return rgba
        
        # Create final mask where 1 and 3 are foreground
        final_mask = np.where((gc_mask == 1) | (gc_mask == 3), 255, 0).astype('uint8')
        
        # Clean up mask with morphological operations
        kernel = np.ones((5, 5), np.uint8)
        final_mask = cv2.morphologyEx(final_mask, cv2.MORPH_OPEN, kernel)
        final_mask = cv2.morphologyEx(final_mask, cv2.MORPH_CLOSE, kernel)
        
        # Dilate the mask slightly to include edge details
        final_mask = cv2.dilate(final_mask, kernel, iterations=1)
        
        # Apply mask to alpha channel
        rgba[:, :, 3] = final_mask
        
        print("Added transparency to garment image with advanced background removal")
        return rgba
    
    def warp_garment(self, garment, keypoints, frame_size, sizing_params=None):
        """Warp the garment to fit the detected pose"""
        frame_height, frame_width = frame_size
        
        # Set default sizing parameters if not provided
        if sizing_params is None:
            sizing_params = {
                'width_scale': 1.2,  # Default width scale - reduced for better fit
                'height_scale': 1.1   # Default height scale
            }
        
        # If no valid keypoints, return original garment
        if not keypoints or not keypoints[1]:  # Check if neck keypoint exists
            return garment
        
        # Get relevant keypoints for garment warping
        neck = keypoints[1]
        right_shoulder = keypoints[2]
        left_shoulder = keypoints[5]
        right_hip = keypoints[8]
        left_hip = keypoints[11]
        
        if not all([neck, right_shoulder, left_shoulder]):
            return garment  # Not enough keypoints
        
        # Calculate garment dimensions based on body
        if right_shoulder and left_shoulder:
            # Calculate Euclidean distance between shoulders
            shoulder_width = np.linalg.norm(
                [left_shoulder[0] - right_shoulder[0], left_shoulder[1] - right_shoulder[1]]
            )
            # Get angle between shoulders for rotation
            shoulder_angle = np.arctan2(
                left_shoulder[1] - right_shoulder[1], 
                left_shoulder[0] - right_shoulder[0]
            ) * 180 / np.pi
        else:
            shoulder_width = frame_width * 0.2  # Fallback
            shoulder_angle = 0
        
        # Calculate torso measurements for better proportions
        torso_height = 0
        if right_hip and left_hip and neck:
            # Distance from neck to hips
            hip_center_x = (left_hip[0] + right_hip[0]) / 2
            hip_center_y = (left_hip[1] + right_hip[1]) / 2
            torso_height = np.linalg.norm([hip_center_x - neck[0], hip_center_y - neck[1]])
        else:
            # Estimate torso height based on shoulder width and typical human proportions
            # Use a more conservative estimate for better fit
            torso_height = shoulder_width * 1.4  # Adjusted from 1.6 for better fit
        
        # Calculate body size estimate
        body_width = shoulder_width * 1.1  # Slightly wider than shoulders (reduced from 1.2)
        
        # Get garment original dimensions
        garment_height, garment_width = garment.shape[:2]
        
        # Calculate aspect ratio of the garment
        garment_aspect = garment_width / float(garment_height) if garment_height > 0 else 1.0
        
        # Calculate ideal dimensions for the garment based on body
        # For t-shirts: width should cover shoulders plus some extra, height should cover torso
        ideal_width = shoulder_width * sizing_params['width_scale']
        ideal_height = torso_height * sizing_params['height_scale']
        
        # Maintain aspect ratio while fitting to body
        if (ideal_width / ideal_height) > garment_aspect:
            # Width-constrained: use ideal width, calculate height to maintain aspect
            target_width = int(ideal_width)
            target_height = int(target_width / garment_aspect)
        else:
            # Height-constrained: use ideal height, calculate width to maintain aspect
            target_height = int(ideal_height)
            target_width = int(target_height * garment_aspect)
        
        # Resize garment to target dimensions
        garment_resized = self.resize_garment(garment, target_width, target_height)
        
        # Apply rotation if shoulders aren't level (beyond a small threshold)
        if abs(shoulder_angle) > 5:
            center = (garment_resized.shape[1] // 2, garment_resized.shape[0] // 2)
            rotation_matrix = cv2.getRotationMatrix2D(center, shoulder_angle, 1.0)
            garment_resized = cv2.warpAffine(
                garment_resized, rotation_matrix, 
                (garment_resized.shape[1], garment_resized.shape[0]),
                flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_TRANSPARENT
            )
        
        # Apply perspective transform to better fit the body shape
        try:
            # Only apply perspective transform if we have all four corners (shoulders and hips)
            if all([right_shoulder, left_shoulder, right_hip, left_hip]):
                # Define source points (corners of the garment)
                garment_h, garment_w = garment_resized.shape[:2]
                src_pts = np.array([
                    [0, 0],  # Top-left
                    [garment_w, 0],  # Top-right
                    [garment_w, garment_h],  # Bottom-right
                    [0, garment_h]  # Bottom-left
                ], dtype=np.float32)
                
                # Define destination points based on body keypoints
                # Scale factors to find garment edges from body keypoints
                top_width_factor = 1.1  # How much wider than shoulders at top
                bottom_width_factor = 0.9  # How much wider than hips at bottom
                
                # Calculate destination points
                top_left_x = left_shoulder[0] - (shoulder_width * (top_width_factor - 1) / 2)
                top_right_x = right_shoulder[0] + (shoulder_width * (top_width_factor - 1) / 2)
                bottom_left_x = left_hip[0] - (shoulder_width * (bottom_width_factor - 1) / 2)
                bottom_right_x = right_hip[0] + (shoulder_width * (bottom_width_factor - 1) / 2)
                
                # Get y-coordinates (adjust top to be at collar position)
                top_y = (left_shoulder[1] + right_shoulder[1]) / 2 - garment_h * 0.2
                bottom_y = top_y + garment_h * 0.95  # Slightly higher than full height for better look
                
                dst_pts = np.array([
                    [top_left_x, top_y],  # Top-left
                    [top_right_x, top_y],  # Top-right
                    [bottom_right_x, bottom_y],  # Bottom-right
                    [bottom_left_x, bottom_y]  # Bottom-left
                ], dtype=np.float32)
                
                # Get perspective transform matrix
                M = cv2.getPerspectiveTransform(src_pts, dst_pts)
                
                # Apply perspective transform
                # Make output size large enough to contain the warped garment
                output_size = (frame_width, frame_height)
                warped = cv2.warpPerspective(garment_resized, M, output_size, 
                                            flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_TRANSPARENT)
                
                # Crop to the actual garment size to avoid large transparent areas
                # Find non-zero alpha channel pixels
                alpha = warped[:, :, 3]
                coords = cv2.findNonZero(alpha)
                
                if coords is not None and len(coords) > 0:
                    x, y, w, h = cv2.boundingRect(coords)
                    warped = warped[y:y+h, x:x+w]
                    return warped
        
        except Exception as e:
            print(f"Perspective transform failed: {e}")
            # Continue with the regular garment if perspective transform fails
            pass
        
        print(f"Resized garment to fit body: {target_width}x{target_height} px")
        return garment_resized
    
    def resize_garment(self, garment, target_width=None, target_height=None):
        """Resize garment maintaining aspect ratio"""
        if garment is None:
            return None
            
        garment_height, garment_width = garment.shape[:2]
        aspect = garment_width / float(garment_height)
        
        if target_width is not None:
            new_width = target_width
            new_height = int(new_width / aspect)
        elif target_height is not None:
            new_height = target_height
            new_width = int(new_height * aspect)
        else:
            return garment  # No resize if no dimensions provided
        
        # High-quality resize
        resized = cv2.resize(garment, (new_width, new_height), interpolation=cv2.INTER_LANCZOS4)
        return resized

class AdvancedVirtualTryOn:
    """Main class for the virtual try-on system"""
    
    def __init__(self, garment_path, camera_index=0, resolution="640x480"):
        # Parse resolution
        width, height = map(int, resolution.split('x'))
        
        # Initialize components
        self.pose_estimator = HumanPoseEstimator()
        self.garment_processor = GarmentProcessor()
        
        # Load garment
        self.garment = self.garment_processor.load_garment(garment_path)
        
        # Initialize camera
        self.camera = cv2.VideoCapture(camera_index)
        self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, width)
        self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
        
        if not self.camera.isOpened():
            raise RuntimeError("Could not open camera")
        
        # Performance tracking
        self.prev_frame_time = 0
        self.new_frame_time = 0
        self.fps = 0
        
        # Garment positioning and sizing parameters - adjusted for better default fit
        self.vertical_offset = 0.05
        self.width_scale = 1.2   # Reduced from 1.5 for a more realistic fit
        self.height_scale = 1.1  # Scale factor for garment height relative to torso
        self.collar_position = 0.20  # Increased to position collar higher on neck
        
        # UI modes
        self.debug_mode = False
        self.show_controls = True
        self.fullscreen_mode = False
        
        # For smoother processing and better performance
        self.skip_frames = 0  # Process every frame by default
        self.frame_counter = 0
        self.last_warped_garment = None
        self.last_keypoints = None
        
        print("Advanced Virtual Try-On initialized. Starting camera feed...")
    
    def update_fps(self):
        """Calculate and update FPS"""
        self.new_frame_time = time.time()
        self.fps = 1 / (self.new_frame_time - self.prev_frame_time) if (self.new_frame_time - self.prev_frame_time) > 0 else 0
        self.prev_frame_time = self.new_frame_time
        return int(self.fps)
    
    def overlay_garment(self, frame, keypoints):
        """Overlay the garment on the frame"""
        frame_height, frame_width = frame.shape[:2]
        
        # Check if we have valid keypoints
        if not keypoints or not keypoints[1]:  # Neck keypoint
            # Use last valid keypoints if available for smoothness
            if self.last_keypoints and self.last_warped_garment is not None:
                keypoints = self.last_keypoints
            else:
                return frame
        else:
            # Store last valid keypoints for smooth transitions
            self.last_keypoints = keypoints
        
        try:
            # Get key body keypoints
            neck = keypoints[1]
            right_shoulder = keypoints[2]
            left_shoulder = keypoints[5]
            
            if not all([neck, right_shoulder, left_shoulder]):
                if self.last_warped_garment is not None:
                    # Use last valid garment if available
                    warped_garment = self.last_warped_garment
                else:
                    return frame
            else:
                # Calculate shoulder midpoint for better centering
                shoulder_center_x = (right_shoulder[0] + left_shoulder[0]) / 2
                shoulder_center_y = (right_shoulder[1] + left_shoulder[1]) / 2
                
                # Check if we should skip processing this frame (for performance)
                self.frame_counter += 1
                if self.skip_frames > 0 and self.frame_counter % (self.skip_frames + 1) != 0 and self.last_warped_garment is not None:
                    warped_garment = self.last_warped_garment
                else:
                    # Pass current sizing parameters to warp_garment
                    sizing_params = {
                        'width_scale': self.width_scale,
                        'height_scale': self.height_scale
                    }
                    
                    # Warp garment to fit the body
                    warped_garment = self.garment_processor.warp_garment(
                        self.garment, keypoints, (frame_height, frame_width), sizing_params
                    )
                    
                    # Save for potential reuse
                    self.last_warped_garment = warped_garment
            
            if warped_garment is None:
                return frame
            
            # Calculate position
            garment_height, garment_width = warped_garment.shape[:2]
            
            if all([neck, right_shoulder, left_shoulder]):
                # Center horizontally on shoulders rather than neck for better alignment
                center_x = int(shoulder_center_x)
                
                # Calculate vertical position based on neck and shoulders
                # Position garment higher for more natural look
                shoulder_y = (right_shoulder[1] + left_shoulder[1]) / 2
                center_y = int(neck[1] + (shoulder_y - neck[1]) * 0.5 - (garment_height * self.collar_position))
            else:
                # Fallback to last known position
                center_x = frame_width // 2
                center_y = frame_height // 3
            
            # Calculate top-left corner
            x1 = center_x - garment_width // 2
            y1 = center_y
            
            # Ensure coordinates are within frame
            x1 = max(0, x1)
            y1 = max(0, y1)
            x2 = min(frame_width, x1 + garment_width)
            y2 = min(frame_height, y1 + garment_height)
            
            # Calculate source region in garment
            g_x1 = 0
            g_y1 = 0
            g_x2 = x2 - x1
            g_y2 = y2 - y1
            
            if g_x2 <= 0 or g_y2 <= 0 or g_x1 >= garment_width or g_y1 >= garment_height:
                return frame
            
            # Adjust if needed
            if g_x2 > garment_width:
                g_x2 = garment_width
                x2 = x1 + g_x2
            
            if g_y2 > garment_height:
                g_y2 = garment_height
                y2 = y1 + g_y2
            
            # Extract regions
            roi = frame[y1:y2, x1:x2].copy()
            garment_roi = warped_garment[g_y1:g_y2, g_x1:g_x2].copy()
            
            if roi.shape[:2] != garment_roi.shape[:2]:
                return frame
            
            # Improved alpha blending with edge feathering
            alpha = garment_roi[:, :, 3] / 255.0
            
            # Apply Gaussian blur to alpha channel for softer edges
            alpha_blur = cv2.GaussianBlur(alpha, (5, 5), 0)
            alpha_blur = np.repeat(alpha_blur[:, :, np.newaxis], 3, axis=2)
            
            # Blend images with the smoothed alpha
            blended = roi * (1 - alpha_blur) + garment_roi[:, :, :3] * alpha_blur
            
            # Apply color correction to match lighting
            # This helps the garment look more natural in the scene
            mean_roi = np.mean(roi, axis=(0, 1))
            mean_garment = np.mean(garment_roi[:, :, :3], axis=(0, 1))
            
            # Apply subtle lighting adjustment (limit the effect for realism)
            lighting_factor = 0.3
            lighting_adjustment = (mean_roi - mean_garment) * lighting_factor
            adjusted_garment = np.clip(garment_roi[:, :, :3] + lighting_adjustment, 0, 255)
            
            # Final blending with lighting adjustment
            final_blend = roi * (1 - alpha_blur) + adjusted_garment * alpha_blur
            frame[y1:y2, x1:x2] = final_blend
            
        except Exception as e:
            print(f"Error overlaying garment: {e}")
        
        return frame
    
    def run(self):
        """Main application loop"""
        print("Advanced Virtual Try-On started. Press 'q' to quit, 'd' to toggle debug mode.")
        print("Use '+'/'-' to adjust garment width, 'up'/'down' arrows to adjust height.")
        print("Use 'c' to toggle control instructions, 'f' to toggle frame skipping for better performance.")
        print("Press 's' to toggle fullscreen mode.")
        
        # Create a resizable window
        cv2.namedWindow('Advanced Virtual Try-On', cv2.WINDOW_NORMAL)
        
        while self.camera.isOpened():
            success, frame = self.camera.read()
            if not success:
                print("Failed to capture frame")
                break
            
            # Flip for mirror effect
            frame = cv2.flip(frame, 1)
            
            # Estimate pose
            keypoints = self.pose_estimator.estimate_pose(frame)
            
            # Overlay garment
            frame = self.overlay_garment(frame, keypoints)
            
            # Draw skeleton in debug mode
            if self.debug_mode:
                frame = self.pose_estimator.draw_skeleton(frame, keypoints)
            
            # Calculate and display FPS
            fps = self.update_fps()
            cv2.putText(frame, f"FPS: {fps}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                       1, (0, 255, 0), 2, cv2.LINE_AA)
            
            # Display current garment fit parameters
            if self.show_controls:
                # Display fitting instructions
                instructions = [
                    "Controls:",
                    f"Width Scale: {self.width_scale:.1f} (+/- to adjust)",
                    f"Height Scale: {self.height_scale:.1f} (up/down arrows)",
                    f"Collar Position: {self.collar_position:.2f} (</> to adjust)",
                    f"Performance: {'High' if self.skip_frames>0 else 'Normal'} (f key)",
                    f"Display: {'Fullscreen' if self.fullscreen_mode else 'Window'} (s key)",
                    "'d' - Toggle debug | 'q' - Quit | 'c' - Hide controls"
                ]
                
                y_pos = 70
                for line in instructions:
                    cv2.putText(frame, line, (10, y_pos), cv2.FONT_HERSHEY_SIMPLEX, 
                               0.5, (0, 255, 0), 1, cv2.LINE_AA)
                    y_pos += 25
            else:
                cv2.putText(frame, "Press 'c' for controls", (10, 70), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 1, cv2.LINE_AA)
            
            # Display the result
            cv2.imshow('Advanced Virtual Try-On', frame)
            
            # Handle key presses
            key = cv2.waitKey(1) & 0xFF
            
            # Quit
            if key == ord('q'):
                break
                
            # Toggle debug mode
            elif key == ord('d'):
                self.debug_mode = not self.debug_mode
                print(f"Debug mode: {'ON' if self.debug_mode else 'OFF'}")
                
            # Toggle control display
            elif key == ord('c'):
                self.show_controls = not self.show_controls
                
            # Toggle fullscreen mode
            elif key == ord('s'):
                self.fullscreen_mode = not self.fullscreen_mode
                if self.fullscreen_mode:
                    cv2.setWindowProperty('Advanced Virtual Try-On', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
                    print("Fullscreen mode enabled")
                else:
                    cv2.setWindowProperty('Advanced Virtual Try-On', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_NORMAL)
                    print("Window mode enabled")
                
            # Adjust width scale
            elif key == ord('+') or key == ord('='):  # = is on the same key as + without shift
                self.width_scale = min(3.0, self.width_scale + 0.1)
                print(f"Width scale: {self.width_scale:.1f}")
                
            elif key == ord('-'):
                self.width_scale = max(0.8, self.width_scale - 0.1)
                print(f"Width scale: {self.width_scale:.1f}")
                
            # Adjust height scale
            elif key == 82:  # Up arrow
                self.height_scale = min(2.0, self.height_scale + 0.1)
                print(f"Height scale: {self.height_scale:.1f}")
                
            elif key == 84:  # Down arrow
                self.height_scale = max(0.6, self.height_scale - 0.1)
                print(f"Height scale: {self.height_scale:.1f}")
                
            # Adjust collar position
            elif key == ord(',') or key == ord('<'):
                self.collar_position = max(0.05, self.collar_position - 0.01)
                print(f"Collar position: {self.collar_position:.2f}")
                
            elif key == ord('.') or key == ord('>'):
                self.collar_position = min(0.3, self.collar_position + 0.01)
                print(f"Collar position: {self.collar_position:.2f}")
                
            # Toggle performance mode
            elif key == ord('f'):
                # Toggle between 0, 1, and 2 frame skips
                self.skip_frames = (self.skip_frames + 1) % 3
                print(f"Performance mode: {'High (skip {self.skip_frames} frames)' if self.skip_frames>0 else 'Normal'}")
        
        # Clean up
        self.clean_up()
    
    def clean_up(self):
        """Clean up resources"""
        if hasattr(self, 'camera') and self.camera.isOpened():
            self.camera.release()
        cv2.destroyAllWindows()
        print("Application closed.")

def main():
    args = parse_args()
    try:
        width, height = map(int, args.resolution.split('x'))
        app = AdvancedVirtualTryOn(args.garment, args.webcam, args.resolution)
        app.run()
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()