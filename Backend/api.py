from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from io import BytesIO
from PIL import Image
import base64
import psycopg2
import subprocess
import json
import geojson
import os
import shutil
import tempfile
import shapefile
from rasterio.io import MemoryFile
import zipfile
from rasterio.warp import calculate_default_transform, reproject, Resampling
from pyproj import CRS, Transformer
import rasterio
from shapely.ops import transform
import numpy as np

import matplotlib.colors as mcolors
from rasterio.enums import Resampling


import matplotlib.pyplot as plt
from PIL import Image
import geopandas as gpd
from typing import Dict


import re
# import traceback

import geojson
from geojson import Feature, FeatureCollection


app = FastAPI()



# origins = "*"

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST"],
#     allow_headers=["*"],
# )

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_UPLOAD_SIZE = 100 * 1024 * 1024  # 100MB

color_palette = [
    "00FFFFFF", "609C60", "5C985C", "589558", "549254", "508E50", "4C8B4C", "488848", "448544",
    "408140", "3C7E3C", "387B38", "347834", "317431", "2D712D", "296E29", "256B25", "216721",
    "1D641D", "196119", "155E15", "115A11", "0D570D", "095409", "065106", "609C60", "5C985C",
    "589558", "549254", "508E50", "4C8B4C", "488848", "448544", "408140", "3C7E3C", "387B38",
    "347834", "317431", "2D712D", "296E29", "256B25", "216721", "1D641D", "196119", "155E15",
    "115A11", "0D570D", "095409", "065106", "609C60", "5C985C", "589558", "549254", "508E50",
    "4C8B4C", "488848", "448544", "408140", "3C7E3C", "387B38", "347834", "317431", "2D712D",
    "296E29", "256B25", "216721", "1D641D", "196119", "155E15", "115A11", "0D570D", "095409",
    "065106", "609C60", "5C985C", "589558", "549254", "508E50", "4C8B4C", "488848", "448544",
    "408140", "3C7E3C", "387B38", "347834", "317431", "2D712D", "296E29", "256B25", "216721",
  "1D641D", "196119", "155E15", "115A11", "0D570D", "095409", "065106", "000000", "000000", "000000",
  "609C60", "609C60", "5C985C", "589558", "549254", "508E50", "4C8B4C", "488848", "448544",
  "408140", "3C7E3C", "387B38", "347834", "317431", "2D712D", "296E29", "256B25", "216721",
    "1D641D", "196119", "155E15", "115A11", "0D570D", "095409", "065106", "609C60", "5C985C",
    "589558", "549254", "508E50", "4C8B4C", "488848", "448544", "408140", "3C7E3C", "387B38",
    "347834", "317431", "2D712D", "296E29", "256B25", "216721", "1D641D", "196119", "155E15",
    "115A11", "0D570D", "095409", "065106", "609C60", "5C985C", "589558", "549254", "508E50",
    "4C8B4C", "488848", "448544", "408140", "3C7E3C",
  "296E29", "256B25", "216721", "1D641D", "196119", "155E15", "115A11", "0D570D", "095409",
  "065106", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8",
  "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8", "071CC8",
  "071CC8", "071CC8", "000000", "000000", "000000", "000000", "000000", "000000", "000000",
  "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000",
  "000000", "000000", "000000", "000000", "000000", "ff2828", "ff2828", "ff2828", "ff2828",
  "ff2828", "ff2828", "ff2828", "ff2828", "ff7d00", "ff7d00", "00ffff", "00ffff", "00ffff",
  "00ffff", "071CC8", "071CC8" 
   ]

# Manually set the first color to fully transparent white
color_palette_rgba = [(1.0, 1.0, 1.0, 0.0)] + [
    mcolors.to_rgba('#' + hex_color, alpha=1.0) for hex_color in color_palette[1:]
]

# Create a colormap
cmap = mcolors.ListedColormap(color_palette_rgba)

# # Debugging Output: Check if the first color is transparent
# print("First color (should be transparent):", cmap.colors[0])

@app.get("/map/raster_morowali/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_mchange_bh_box.tiff")

@app.get("/map/raster_morowali2/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_mchange_wd_box.tiff")
  
@app.get("/map/raster1/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_mchange_geometrynikel.tiff")

@app.get("/map/rasterNikelA/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m00_geometrynikel.tif")

@app.get("/map/rasterNikelB/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m05_geometrynikel.tif")

@app.get("/map/rasterNikelC/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m10_geometrynikel.tif")

@app.get("/map/rasterNikelD/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m15_geometrynikel.tif")
@app.get("/map/rasterNikelE/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m20_geometrynikel.tif")




@app.get("/map/raster2/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_mchange_geometrykuarsa.tif")


@app.get("/map/rasterkuarsaA/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m00_geometrykuarsa.tif")

@app.get("/map/rasterkuarsaB/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m05_geometrykuarsa.tif")

@app.get("/map/rasterkuarsaC/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m10_geometrykuarsa.tif")

@app.get("/map/rasterkuarsaD/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m15_geometrykuarsa.tif")
@app.get("/map/rasterkuarsaE/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m20_geometrykuarsa.tif")



@app.get("/map/raster3/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_mchange_geometrybauksit.tif")

@app.get("/map/rasterbauksitA/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m00_geometrybauksit.tif")

@app.get("/map/rasterbauksitB/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m05_geometrybauksit.tif")

@app.get("/map/rasterbauksitC/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m10_geometrybauksit.tif")

@app.get("/map/rasterbauksitD/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m15_geometrybauksit.tif")
@app.get("/map/rasterbauksitE/")
async def get_raster1():
    return await process_raster_file(r"Backend/data/image_export_m20_geometrybauksit.tif")


@app.get("/map/shapefile/")
async def get_shapefile():
    zip_path = r"Backend/data/world-administrative-boundaries.zip"  # Ganti dengan path ke file .zip Anda
    feature_collection = process_shapefile(zip_path)
    return await feature_collection


 
 
 
async def calculate_area_from_single_band(data: np.ndarray, transform, thresholds: Dict[str, tuple]) -> Dict[str, float]:
    try:
        if data is None or data.shape[0] == 0:
            raise ValueError("Raster data is empty or invalid.")

        print(f"Min Pixel Value: {data[0].min()}, Max Pixel Value: {data[0].max()}")

        # Resolusi Landsat = 30m per piksel -> 900 m² per piksel
        pixel_area = 30 * 30  # 900 m²

        area_results = {}
        for category, (min_val, max_val) in thresholds.items():
            mask = (data[0] >= min_val) & (data[0] <= max_val)
            pixel_count = np.sum(mask)  # Hitung jumlah piksel dalam kategori ini

            area_m2 = pixel_count * pixel_area  # Konversi ke luas dalam meter persegi
            area_results[category] = int(area_m2)

            print(f"{category} - Threshold: ({min_val}, {max_val}), Pixels Found: {pixel_count}, Area (m²): {area_m2}")

        return area_results

    except Exception as e:
        print(f"Error processing raster for area calculation: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


def reproject_raster(input_path, output_path, dst_crs="EPSG:3857"):
    with rasterio.open(input_path) as src:
        # Cek apakah raster sudah dalam meter (EPSG:3857)
        if src.crs.to_string() == dst_crs:
            print(f"Raster sudah dalam {dst_crs}, tidak perlu reproyeksi.")
            return input_path  # Langsung gunakan file asli

        # Lakukan transformasi koordinat
        transform, width, height = calculate_default_transform(
            src.crs, dst_crs, src.width, src.height, *src.bounds
        )
        
        kwargs = src.meta.copy()
        kwargs.update({
            "crs": dst_crs,
            "transform": transform,
            "width": width,
            "height": height
        })

        with rasterio.open(output_path, "w", **kwargs) as dst:
            for i in range(1, src.count + 1):
                reproject(
                    source=rasterio.band(src, i),
                    destination=rasterio.band(dst, i),
                    src_transform=src.transform,
                    src_crs=src.crs,
                    dst_transform=transform,
                    dst_crs=dst_crs,
                    resampling=Resampling.nearest
                )

    print(f"Raster berhasil direproyeksi ke {dst_crs}")
    return output_path  # Kembalikan path raster yang sudah diproses
    
 
async def process_raster_file(file_path: str):
    raster_images = []
    converted_bounds = []
    try:
          # Pastikan file raster ada
        if not os.path.isfile(file_path):
            raise HTTPException(status_code=404, detail=f"Raster file not found: {file_path}")

    # Cek CRS raster dan konversi jika perlu
        with rasterio.open(file_path) as dataset:
            print(f"CRS Awal: {dataset.crs}")  # Cek CRS sebelum reproyeksi
        
        if dataset.crs.to_string() == "EPSG:4326":
            print("Raster masih dalam EPSG:4326, melakukan reproyeksi ke EPSG:3857...")
            file_path = reproject_raster(file_path, "reprojected.tif", "EPSG:3857")
    
    # Buka kembali raster setelah reproyeksi
        with rasterio.open(file_path) as dataset:
            data = dataset.read()

            if data is None or data.shape[0] == 0:
                raise HTTPException(status_code=404, detail="Invalid or empty raster file.")

            # Handle single-band or multi-band images
            num_bands = data.shape[0]
              # Example colormap
            
            if num_bands == 1:
                band_normalized = (data[0] - data[0].min()) / (data[0].max() - data[0].min())
                rgba_image = cmap(band_normalized)  # Apply colormap
                rgb_image = (rgba_image[:, :, :3] * 255).astype('uint8')
                image = Image.fromarray(rgb_image)
                
                # Simpan image ke byte array
                img_byte_array = BytesIO()
                image.save(img_byte_array, format='PNG')
                raster_images.append(img_byte_array.getvalue())

                # Hitung luas berdasarkan nilai piksel (threshold) yang diperbarui
                thresholds = {
                        "Tutupan Vegetasi": (20, 89),  # Hijau (#609C60 → #065106)
                        "Tubuh Air": (170, 185),  # Biru (#071CC8)
                        "Lahan Terbuka": (210, 255),  # Merah (#FF2828)
                        "Lahan Kebun": (186, 209),  # Oranye (#FF7D00)
                        "Daerah Terbangun": (160, 169),  # Cyan (#00FFFF)
                        "Lahan Restorasi": (0, 20)  # Hijau Gelap (#000000 → #065106)
                    }

                # Panggil fungsi untuk menghitung luas area per kategori
                area_result = await calculate_area_from_single_band(data, dataset.transform, thresholds)
            else:
                raise HTTPException(status_code=400, detail="Only single-band rasters are supported for this operation.")

            # Ekstrak bounding box dari raster
            bbox = dataset.bounds
            bounds = [[bbox.left, bbox.bottom], [bbox.right, bbox.top]]

            # Transformasi CRS jika diperlukan
            transformer = Transformer.from_crs(dataset.crs, "epsg:4326", always_xy=True)
            converted_bounds = [transformer.transform(*coord) for coord in bounds]
            converted_bounds = [
                [converted_bounds[0][1], converted_bounds[0][0]],
                [converted_bounds[1][1], converted_bounds[1][0]]
            ]

            # Encode image dalam base64
            if img_byte_array:
                encoded_image = base64.b64encode(img_byte_array.getvalue()).decode()
            else:
                raise HTTPException(status_code=500, detail="Error generating image byte array.")
            
            Response = JSONResponse(content={
                "raster_images": [encoded_image],
                "bounds": converted_bounds,
                "area_result": area_result
            })
            
            print(">>>>>" ,Response)

            return Response

    except HTTPException as e:
        raise e
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    

    
async def process_shapefile(zip_path):
    temp_dir = "temp_shapefile_data"
    os.makedirs(temp_dir, exist_ok=True)

    try:
        # Ekstrak file dari ZIP
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Cari file .shp
        shapefile_path = None
        for file_name in os.listdir(temp_dir):
            if file_name.endswith(".shp"):
                shapefile_path = os.path.join(temp_dir, file_name)
                break

        if not shapefile_path:
            raise FileNotFoundError("Tidak ada file .shp dalam ZIP")

        # Membaca data dari shapefile
        with shapefile.Reader(shapefile_path, encoding='ISO-8859-1') as shp:
            fields = shp.fields[1:]  # Skip deletion field
            field_names = [field[0].lower() for field in fields]

            # Buat FeatureCollection
            features = []
            for shape_record in shp.shapeRecords():
                geometry = shape_record.shape.__geo_interface__
                properties = dict(zip(field_names, shape_record.record))
                feature = geojson.Feature(
                    id=None,  # Anda bisa mengisi ID jika diperlukan
                    geometry=geometry,
                    properties=properties
                )
                features.append(feature)

            feature_collection = geojson.FeatureCollection(features)
            return feature_collection

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

    finally:
        # Hapus file sementara
        for root, _, files in os.walk(temp_dir, topdown=False):
            for file_name in files:
                os.remove(os.path.join(root, file_name))
            os.rmdir(root)

@app.get("/verify-db-connection")
async def verify_db_connection():
    try:
        # Attempt to connect to the database
        conn = psycopg2.connect(
            host="10.238.0.3",
            port="5432",
            dbname="nyoba",
            user="postgres",
            password="15032003"
        )
        conn.close()
        return {"message": "Database connection successful"}
    except Exception as e:
        print("Database connection error:", e)
        raise HTTPException(status_code=500, detail="Failed to connect to the database")
    
# @app.get("/raster/")
# async def get_raster():
#     raster_images = []
#     converted_bounds = []

#     try:
#         # Path to local raster file
#         file_path = os.path.abspath(r"Backend/data/image_export_mchange_geometrynikel.tiff")
#         print("File path:", file_path)

#         if not os.path.isfile(file_path):
#             raise HTTPException(status_code=404, detail="Raster file not found.")

#         # Open the raster file
#         with rasterio.open(file_path) as dataset:
#             data = dataset.read()
#             if data is None or data.shape[0] == 0:
#                 raise HTTPException(status_code=404, detail="Invalid or empty raster file.")

#             # Handle single-band or multi-band images
#             num_bands = data.shape[0]
#               # Example colormap
            
#             if num_bands == 1:
#                 band_normalized = (data[0] - data[0].min()) / (data[0].max() - data[0].min())
#                 rgba_image = cmap(band_normalized)  # Apply colormap
#                 rgb_image = (rgba_image[:, :, :3] * 255).astype('uint8')  # Convert to RGB
#                 image = Image.fromarray(rgb_image)
#             else:
#                 bands = [(band - band.min()) / (band.max() - band.min()) * 255 for band in data[:3]]
#                 bands = [Image.fromarray(b.astype('uint8')) for b in bands]
#                 image = Image.merge('RGB', bands[:3])

#             # Save image to byte array
#             img_byte_array = BytesIO()
#             image.save(img_byte_array, format='PNG')
#             raster_images.append(img_byte_array.getvalue())

#             # Extract bounding box from the raster
#             bbox = dataset.bounds
#             bounds = [[bbox.left, bbox.bottom], [bbox.right, bbox.top]]

#             # CRS Transformation (if needed)
#             transformer = Transformer.from_crs("epsg:4326", "epsg:4326", always_xy=True)
#             converted_bounds = [transformer.transform(*coord) for coord in bounds]
#             converted_bounds = [
#                 [converted_bounds[0][1], converted_bounds[0][0]],
#                 [converted_bounds[1][1], converted_bounds[1][0]]
#             ]

#         # Encode image in base64
#         encoded_image = base64.b64encode(img_byte_array.getvalue()).decode()

#         return JSONResponse(content={"raster_images": [encoded_image], "bounds": converted_bounds})

#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         print("Error:", e)
#         raise HTTPException(status_code=500, detail="Internal Server Error")



# from torch.utils.data import Dataset, DataLoader
# from torchvision import transforms
# from PIL import Image

# # Define a custom dataset class
# class CustomDataset(Dataset):
#     def __init__(self, images_dir, annotations_dir, transform=None):
#         self.images_dir = images_dir
#         self.annotations_dir = annotations_dir
#         self.transform = transform
#         self.images = sorted(os.listdir(images_dir))
#         self.annotations = sorted(os.listdir(annotations_dir))

#     def __len__(self):
#         return len(self.images)

#     def __getitem__(self, idx):
#         img_path = os.path.join(self.images_dir, self.images[idx])
#         annot_path = os.path.join(self.annotations_dir, self.annotations[idx])
        

#         if not os.path.exists(img_path) or not os.path.exists(annot_path):
#             raise FileNotFoundError(f"File not found: {img_path} or {annot_path}")
#         # Open the image
        

#         image = Image.open(img_path).convert("RGB")
        
#         # Load the corresponding annotation file (e.g., bounding boxes, labels)
#         boxes, labels, masks = self.parse_annotations(annot_path)
        
#         if self.transform:
#             image = self.transform(image)
        
#         # Return a dictionary with the necessary information
#         return {
#             "image": image,
#             "boxes": boxes,
#             "labels": labels,
#             "masks": masks
#         }
#     def parse_annotations(self, annot_path):
#         boxes = []
#         labels = []

#         print(f"Parsing annotations from: {annot_path}")  # Debug print

#         with open(annot_path, 'r') as file:
#             for line in file:
#                 line = line.strip()

#                 if line:
#                     print(f"Line: {line}")  # Print each line being processed

#                     try:
#                         # Match the expected format
#                         # We expect the format: "(x1,y1),(x2,y2),class_id"
#                         parts = line.rsplit(',', 1)  # Split at the last comma
#                         if len(parts) != 2:
#                             print(f"Unexpected format in line: {line}")  # Debug print
#                             continue

#                         coords, class_id_str = parts
#                         class_id = int(class_id_str.strip())  # Convert class ID to int

#                         # Clean and split coordinates
#                         coords = coords.replace('(', '').replace(')', '').split('),(')
#                         if len(coords) != 2:
#                             print(f"Unexpected coordinate format in line: {line}")  # Debug print
#                             continue

#                         # Further clean up coordinates to handle extra spaces
#                         x1, y1 = map(int, coords[0].strip().split(','))
#                         x2, y2 = map(int, coords[1].strip().split(','))

#                         # Append to boxes and labels
#                         boxes.append([x1, y1, x2, y2])
#                         labels.append(class_id)

#                         print(f"Parsed box: {boxes[-1]}, label: {labels[-1]}")  # Debug print for parsed values

#                     except ValueError as e:
#                         print(f"ValueError parsing line '{line}': {e}")  # More specific error handling
#                     except Exception as e:
#                         print(f"Error parsing line '{line}': {e}")

#         print(f"Parsed boxes: {boxes}")  # Debug print for boxes
#         print(f"Parsed labels: {labels}")  # Debug print for labels

#         return boxes, labels, None  # No masks returned




# # Define transformations for the images
# transform = transforms.Compose([
#     transforms.Resize((224, 224)),
#     transforms.ToTensor(),
# ])

# # Initialize the dataset
# dataset = CustomDataset(
#     images_dir='./NWPU VHR-10 dataset/positive image set', 
#     annotations_dir='./NWPU VHR-10 dataset/ground truth',
#     transform=transform
# )

# # Custom collate function for object detection (if needed)
# def collate_fn_detection(batch):
#     images = [item['image'] for item in batch]
#     boxes = [item['boxes'] for item in batch]
#     labels = [item['labels'] for item in batch]
#     masks = [item['masks'] for item in batch]
   
#     return {
#         "images": images,
#         "boxes": boxes,
#         "labels": labels,
#         "masks": masks
#     }

# # Initialize the DataLoader
# dataloader = DataLoader(
#     dataset,
#     batch_size=128,
#     shuffle=True,
#     num_workers=0,  # Set to 0 for debugging
#     collate_fn=collate_fn_detection,
# )

# # Training loop
# for batch in dataloader:
#     images = batch["images"]  # list of images
#     boxes = batch["boxes"]  # list of boxes
#     labels = batch["labels"]  # list of labels
#     masks = batch["masks"]  # list of masks
#     # Print batch information
#     print(f"Batch loaded: {len(images)} images")
#     print(f"First image size: {images[0].shape if images else 'No image'}")
#     print(f"First batch boxes: {boxes[0] if boxes else 'No boxes'}")
#     print(f"First batch labels: {labels[0] if labels else 'No labels'}")

