import os
import numpy as np
from scipy.interpolate import interp1d
from zipfile import ZipFile
from io import BytesIO


target_mass= 1.4 # M= 1.4 M_sun
file_mr= "eos.mr"
zip_path= "eos.zip"
import time

def extract_radius(zip_stream, target_mass):
#    try:    
#        with open(zip_path, "rb") as f:
#            zip_bytes = f.read()

#    except FileNotFoundError:
#        print(f"Zip file '{zip_path}' not found.")
#        return

    with ZipFile(zip_stream) as zip_file:
        if file_mr not in zip_file.namelist():
            raise ValueError("File 'eos.mr' not found in the zip archive. Please try with another EoS.")
            

        with zip_file.open(file_mr) as file_mr_stream:
            masses, radii = load_mass_radius_data(file_mr_stream)
            masses, radii = sort_masses_radii(masses, radii)
            radius = interpolate_mass_radius(masses, radii, target_mass)
            return radius
          
    

def load_mass_radius_data(file_mr):

    masses = []
    radii = []

    for raw_line in file_mr:
        try:
            line = raw_line.decode("utf-8").strip()
        except UnicodeDecodeError:
            print("Decode error in this line" + raw_line)
            continue
        
        if line == "" or line.startswith("#"):
            continue
            
        columns = line.strip().split()
        if len(columns) >= 2:
                    try:
                        radius = float(columns[0])
                        mass = float(columns[1])
                        masses.append(mass)
                        radii.append(radius)
                    except ValueError:
                        print("Error while saving mass and radius arrays")
                        continue

    # Convert to np array
    masses = np.array(masses)
    radii = np.array(radii)

    return masses, radii


def interpolate_mass_radius(masses, radii,target_mass):
    # Interpolation
    interp_func = interp1d(masses, radii, kind='linear')

    # For target mass
    r_interp = interp_func(target_mass)
    return float(r_interp)


def sort_masses_radii(masses, radii):
    # Sort masses and corresponding radii in increasing mass order
    ordered_indexes= np.argsort(masses)
    return masses[ordered_indexes], radii[ordered_indexes]
