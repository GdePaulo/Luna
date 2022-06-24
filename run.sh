#!/bin/bash
# Make conda commands available to sub terminals
source c:/Users/Ameno/Anaconda3/etc/profile.d/conda.sh
cd translator/api

conda activate luna-translate
# c:/Users/Ameno/Anaconda3/condabin/activate.bat luna-translate
# python --version # example way to see that your virtual env loaded as expected
# c:/Users/Ameno/Anaconda3/envs/luna-translate/bin/python -m flask run
python -m flask run

# using file, using regular SH and fixing activation, using CMD file