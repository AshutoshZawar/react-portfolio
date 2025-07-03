def match_nuts_and_bolts(nuts, bolts, low, high):
    """ 
    Args:  low: Start index
           high: End index
    """
    if low < high:
        import random
        pivot_idx = random.randint(low, high)
        pivots = bolts[pivot_idx]
        
        pivot_position = partition(nuts, low, high, pivots)
        
        partition(bolts, low, high, nuts[pivot_position])
        
        match_nuts_and_bolts(nuts, bolts, low, pivot_position - 1)
        match_nuts_and_bolts(nuts, bolts, pivot_position + 1, high)


def partition(arr, low, high, pivot):
    """
    Partitioning the array around the pivot.
    Args:  pivot: The pivot element (a nut or a bolt)
    """
    pivot_position = -1
    for i in range(low, high + 1):
        if arr[i] == pivot:
            pivot_position = i
            break
    
    if pivot_position != -1:
        arr[pivot_position], arr[high] = arr[high], arr[pivot_position]
    
   
    i = low  
    
    for j in range(low, high):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    
    arr[i], arr[high] = arr[high], arr[i]
    
    return i 

if __name__ == "__main__":
    nuts = ['@', '#', '$', '%', '^', '&']
    bolts = ['$', '%', '&', '^', '@', '#']

    match_nuts_and_bolts(nuts, bolts, 0, len(nuts) - 1)

    print("Matched Nuts are: ", nuts)
    print("Matched Bolts are: ", bolts)