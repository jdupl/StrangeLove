#!/usr/bin/env python
#author Daxime Mupuis
#graph reduction algoritm "Less is more"
#nothing fancy here

from __future__ import division
import random

#reduces graph
def graph_reduce(number_of_points, data, average):

    if number_of_points > len(data):
        #?instead maybe make a method to 
        #spread values across the desired length?
        #but... this is a reduction method after all, 
        #not going to bother
        return data

    leap = len(data)/number_of_points

    reduced = []
    leap_iter = 0
    for x in range(0, number_of_points):
        from_point = int(leap * x)
        to_point = int (leap * (x+1))
        aggregation = 0
        for y in range(from_point, to_point):
            aggregation += data[y]
        if average:
            aggregation = aggregation / (to_point - from_point ) 
        reduced.append(int(aggregation))
        
    return reduced

#aggregates values at calculated intervals
def graph_reduce_additive(number_of_points, data):
    return graph_reduce(number_of_points, data, False)
    


#averages values within calculated intervals
def graph_reduce_average(number_of_points, data):
    return graph_reduce(number_of_points, data, True)




#random test data generation
data = []

for x in range(0, random.randint(50,100)):
    data.append(random.randint(0,100))

print('\nsample: (length:' +str(len(data)) + ')')
print data

#method testing
reduced_add = graph_reduce_additive(15,data)
reduced_avg = graph_reduce_average(15,data)
print('\naggregation result: (length:' + str(len(reduced_add)) + ')')
print reduced_add
print('\naverage result: (length:' + str(len(reduced_avg)) + ')')
print reduced_avg
