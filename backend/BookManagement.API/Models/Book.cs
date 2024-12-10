using System;
using System.ComponentModel.DataAnnotations;

namespace BookManagement.API.Models
{
    public class Book
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Author { get; set; } = string.Empty;

        public string? ISBN { get; set; }

        [Required]
        public DateTime PublicationDate { get; set; }
    }
}